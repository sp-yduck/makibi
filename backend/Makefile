IMG := docker.io/spyduck/mbw-api:latest

# add localbin to PATh
LOCALBIN := $(shell pwd)/bin
export PATH := $(abspath $(LOCALBIN)):$(PATH)

# Get the currently used golang install path (in GOPATH/bin, unless GOBIN is set)
ifeq (,$(shell go env GOBIN))
GOBIN=$(shell go env GOPATH)/bin
else
GOBIN=$(shell go env GOBIN)
endif

GOARCH  := $(shell go env GOARCH)
GOOS    := $(shell go env GOOS)

# Setting SHELL to bash allows bash commands to be executed by recipes.
# Options are set to exit when a recipe line exits non-zero or a piped command fails.
SHELL = /usr/bin/env bash -o pipefail
.SHELLFLAGS = -ec


##@ General

.PHONY: help
help: ## Display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_0-9-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)


##@ Tool Binaries

## Location to install dependencies to
$(LOCALBIN):
	mkdir -p $(LOCALBIN)

## Tool Binaries
SWAG ?= $(LOCALBIN)/swag
GOLANGCI_LINT := $(LOCALBIN)/golangci-lint

## Tool Versions
SWAG_VERSION ?= v1.16.4
GOLANGCI_LINT_VER := v1.54.0

.PHONY: swag
swag: $(SWAG) ## Download swag
$(SWAG): $(LOCALBIN)
	GOBIN=$(LOCALBIN) go install github.com/swaggo/swag/cmd/swag@$(SWAG_VERSION)

.PHONY: golangci-lint
golangci-lint: $(GOLANGCI_LINT) ## Downloads golangci-lint
$(GOLANGCI_LINT): $(LOCALBIN)
	@if test -x $(LOCALBIN)/golangci-lint && golangci-lint version | grep -q $(GOLANGCI_LINT_VER); then \
		rm -rf $(LOCALBIN)/golangci-lint; \
	fi
	test -s $(LOCALBIN)/golangci-lint || curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(LOCALBIN) $(GOLANGCI_LINT_VER)


##@ Development

.PHONY: fmt
fmt: go-fmt swag-fmt ## Run go fmt and swag fmt against code.

.PHONY: go-fmt
go-fmt: ## Run go fmt against code.
	go fmt ./...

.PHONY: vet
vet: ## Run go vet against code.
	go vet ./...

.PHONY: swag-fmt
swag-fmt: swag ## Run 'swag fmt' command
	$(SWAG) fmt --dir ./

.PHONY: swag-init
swag-init: swag-fmt ## Run 'swag init' command
	$(SWAG) init --dir ./ --parseDependency --parseInternal

.PHONY: lint
lint: golangci-lint ## Run golangci-lint
	$(GOLANGCI_LINT) run


##@ Build

.PHONY: build
build: fmt vet swag-init ## Build
	go build -o bin/api-server main.go

LOCAL_CONFIG=config.yaml
.PHONY: run
run: build ## Run locally
	./bin/api-server -v --config=${LOCAL_CONFIG} ${ARGS}
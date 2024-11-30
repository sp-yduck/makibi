/*
Copyright © 2024 Teppei Sudo
*/
package main

import (
	"os"

	"github.com/sp-yduck/makibi/backend/cmd"
	_ "github.com/sp-yduck/makibi/backend/docs"
)

var rootCmd = cmd.NewRootCommand()

// this comments are for swaggo/swag.
// please update the following comments accordingly.
// ref: https://github.com/swaggo/swag?tab=readme-ov-file#general-api-info
//
//	@title			Makibi API
//	@version		v0.0.1
//	@description	This is a simple API server for Makibi project.
//
//	@BasePath		/api/v1

func main() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

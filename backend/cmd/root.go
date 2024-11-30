package cmd

import (
	"fmt"

	"github.com/sp-yduck/makibi/backend/config"
	"github.com/sp-yduck/makibi/backend/logger"
	"github.com/sp-yduck/makibi/backend/oauth"
	"github.com/sp-yduck/makibi/backend/server"
	"github.com/sp-yduck/makibi/backend/validation"
	"github.com/spf13/cobra"
)

var (
	log = logger.S().With("pkg", "cmd")
)

type RootOptions struct {
	args []string

	// server
	bindAddress string
	port        int

	// config
	configFile string

	// logger
	verbose bool
}

func NewRootOptions() *RootOptions {
	return &RootOptions{}
}

func NewRootCommand() *cobra.Command {
	o := NewRootOptions()
	cmd := &cobra.Command{
		Use:   "nano-apiserver",
		Short: "nano-apiserver",
		Long:  ``,
		RunE: func(cmd *cobra.Command, args []string) error {
			o.args = args
			return o.run()
		},
	}
	cmd.Flags().StringVar(&o.bindAddress, "bind-address", "127.0.0.1", "api-server's bind address")
	cmd.Flags().IntVar(&o.port, "port", 8080, "api-server's port number")
	cmd.Flags().StringVar(&o.configFile, "config", "", "config file path")
	// cmd.Flags().BoolVarP(&o.verbose, "verbose", "v", false, "enable debug level log")
	return cmd
}

func (o *RootOptions) run() error {
	if err := logger.InitGlobalLogger(o.verbose); err != nil {
		return err
	}

	// initialize validation
	// must be before reading config file as it uses validation
	if err := validation.InitValidator(); err != nil {
		return err
	}

	// read config yaml file
	config, err := config.ReadConfigFromFile(o.configFile)
	if err != nil {
		return err
	}

	// initialize oauth pkg
	if err := oauth.InitOauthConfig(config.Oauth); err != nil {
		return err
	}

	server := server.NewServer()
	log.Info("Starting server")
	return server.Run(fmt.Sprintf("%s:%d", o.bindAddress, o.port))
}

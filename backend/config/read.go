package config

import (
	"os"

	"github.com/sp-yduck/makibi/backend/logger"
	"github.com/sp-yduck/makibi/backend/oauth"
	"github.com/sp-yduck/makibi/backend/validation"
	"gopkg.in/yaml.v3"
)

var (
	log = logger.S().With("pkg", "config")
)

type Config struct {
	Oauth oauth.OAuth2Config `yaml:"oauth" validate:"required"`
}

// read file and unmarshal it on Config type
func ReadConfigFromFile(path string) (Config, error) {
	log.Infof("Reading config yaml file: %s", path)

	var config Config
	b, err := os.ReadFile(path)
	if err != nil {
		return config, err
	}
	if err := unmarshalYAML(b, &config); err != nil {
		return config, err
	}

	log.Debugf("Config: %v", config)
	return config, nil
}

// Unmarshal yaml with validation
func unmarshalYAML(in []byte, out interface{}) error {
	if err := yaml.Unmarshal(in, out); err != nil {
		return err
	}
	if err := validation.ValidateStruct(out); err != nil {
		return err
	}
	return nil
}
package logger

import (
	"fmt"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

// initialize zap global logger
func InitGlobalLogger(verbose bool) error {
	logLevel := zap.InfoLevel
	if verbose {
		logLevel = zap.DebugLevel
	}
	level := zap.NewAtomicLevel()
	level.SetLevel(logLevel)
	config := zap.Config{
		Level:    level,
		Encoding: "json",
		EncoderConfig: zapcore.EncoderConfig{
			TimeKey:        "Time",
			LevelKey:       "Level",
			NameKey:        "Name",
			CallerKey:      "Caller",
			MessageKey:     "Msg",
			StacktraceKey:  "St",
			EncodeLevel:    zapcore.CapitalLevelEncoder,
			EncodeTime:     zapcore.ISO8601TimeEncoder,
			EncodeDuration: zapcore.StringDurationEncoder,
			EncodeCaller:   zapcore.ShortCallerEncoder,
		},
		OutputPaths:      []string{"stdout"},
		ErrorOutputPaths: []string{"stderr"},
	}
	logger, err := config.Build()
	if err != nil {
		return fmt.Errorf("failed to create new logger: %w", err)
	}
	defer func() {
		err = logger.Sync()
	}()
	zap.ReplaceGlobals(logger)
	return nil
}

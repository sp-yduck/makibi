package log

import "go.uber.org/zap"

// return zap sugared logger
func S() *zap.SugaredLogger {
	return zap.S()
}

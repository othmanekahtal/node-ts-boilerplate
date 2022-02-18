import express, {NextFunction, Request, Response} from 'express'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import hpp from 'hpp'
const server = express()
import {authRoute} from '@routes/index.route'
import errorHandler from '@utils/errorHandler'
import {ErrorExceptionService} from '@services/index.service'
import cookieParser from 'cookie-parser'

// if cycle not finished yet At this moment , we have a router that handled in the previous middlewares
/**
 * all == all verbs put,delete,patch,get,post
 */

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
server.use(helmet())
server.use(cookieParser())
// Development logging
if (process.env.NODE_ENV === 'development') {
  server.use(morgan('dev'))
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
})
server.use('/api', limiter)

// Body parser, reading data from body into req.body
server.use(express.json({limit: '10kb'}))

// Data sanitization against NoSQL query injection
server.use(mongoSanitize())

// Data sanitization against XSS
// convert all html or malicious code to symbols
server.use(xss())

// Prevent parameter pollution
server.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
)

// Serving static files
server.use(express.static(`${__dirname}/public`))

server.use('/api/v1', authRoute)

server.all('*', (req: Request, _: Response, next: NextFunction) =>
  next(
    new errorHandler({
      message: `Can't find ${req.originalUrl} on this server`,
      statusCode: 404,
    }),
  ),
)

/*
we create a central middleware for handle all errors
 */
server.use(ErrorExceptionService)
/**
 * if we pass any parameter to next() function automatically express will know that was an error
 * when we pass param to next() express skip all middlewares in stack to the error handler
 */
export default server

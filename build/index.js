/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.ts":
/*!********************!*\
  !*** ./src/App.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst cors = __webpack_require__(/*! cors */ \"cors\");\r\nconst helmet = __webpack_require__(/*! helmet */ \"helmet\");\r\nconst swaggerUi = __webpack_require__(/*! swagger-ui-express */ \"swagger-ui-express\");\r\nconst Documents_1 = __webpack_require__(/*! ./docs/Documents */ \"./src/docs/Documents.ts\");\r\nconst swaggerDoc = new Documents_1.default();\r\nclass App {\r\n    constructor(routes, repository, variables, service) {\r\n        this.app = express();\r\n        this.expressRouter = express.Router();\r\n        this.port = process.env.PORT || variables.port;\r\n        this.routes = routes;\r\n        this.repository = repository;\r\n        this.service = service;\r\n        this._registerRoute = this._registerRoute.bind(this);\r\n        this._createRouteBoundAction = this._createRouteBoundAction.bind(this);\r\n        this._buildControllerInstance = this._buildControllerInstance.bind(this);\r\n    }\r\n    _registerRoute(uri, httpMethod, boundAction) {\r\n        this.expressRouter.route(uri)[httpMethod](boundAction);\r\n    }\r\n    _createRouteBoundAction(controllerClass, method, isSecure) {\r\n        const result = [\r\n            (req, res) => {\r\n                this._buildControllerInstance(controllerClass, req, res)[method]();\r\n            }\r\n        ];\r\n        if (isSecure) {\r\n            result.unshift(this.service.security.authenticate());\r\n        }\r\n        return result;\r\n    }\r\n    _buildControllerInstance(ControllerClass, req, res) {\r\n        return new ControllerClass({\r\n            params: req.params,\r\n            query: req.query,\r\n            headers: req.headers,\r\n            body: req.body,\r\n            repository: this.repository,\r\n            user: req.user,\r\n            send: (statusCode, resource, location) => {\r\n                if (location) {\r\n                    res.location(location);\r\n                }\r\n                res.status(statusCode).send(resource);\r\n            }\r\n        });\r\n    }\r\n    start() {\r\n        this.app.use(express.json({ limit: \"30mb\" }));\r\n        this.app.use(express.urlencoded({ limit: \"30mb\", extended: true }));\r\n        this.app.use((req, res, next) => {\r\n            res.header(\"Access-Control-Allow-Origin\", \"*\");\r\n            res.header(\"Access-Control-Allow-Headers\", \"Origin, X-Requested-With, Content-Type, Accept, x-auth-token\");\r\n            next();\r\n        });\r\n        this.app.use(cors());\r\n        this.app.use(helmet());\r\n        this.repository.registerRepositories();\r\n        this.routes.registerRoutes(this._registerRoute, this._createRouteBoundAction);\r\n        this.app.use(\"/api/v1/docs\", swaggerUi.serve, swaggerUi.setup(swaggerDoc.getDoc()));\r\n        this.app.use(\"/api/v1\", this.expressRouter);\r\n        this.app.use(\"/api/v1/reconnect-db\", (req, res) => {\r\n            this.service.transactionService.reconnectDB();\r\n            res.status(200).send({ message: \"Reconnect database SUCCESS!\" });\r\n        });\r\n        this.app.use((req, res) => {\r\n            res.status(404).send({ url: `${req.originalUrl} not found!` });\r\n        });\r\n        this.app.listen(this.port, () => this.service.logger.info(`App listening on port: ${this.port}.`));\r\n    }\r\n}\r\nexports.default = App;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/App.ts?");

/***/ }),

/***/ "./src/config/DataBase.ts":
/*!********************************!*\
  !*** ./src/config/DataBase.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nclass DataBase {\r\n    constructor(variables, logger) {\r\n        const { urlDb } = variables;\r\n        this.urlDb = urlDb;\r\n        this.logger = logger;\r\n        this.connect();\r\n    }\r\n    connect() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const optionConnClient = {\r\n                useNewUrlParser: true,\r\n                useFindAndModify: false,\r\n                useCreateIndex: true,\r\n                useUnifiedTopology: true,\r\n                retryWrites: true\r\n            };\r\n            return yield mongoose.connect(this.urlDb, optionConnClient)\r\n                .then((connection) => {\r\n                this.logger.info(\"Success connect to database.\");\r\n                return connection;\r\n            })\r\n                .catch((err) => {\r\n                throw new Error(`ERROR DATABASE: ${err}`);\r\n            });\r\n        });\r\n    }\r\n    getDb() {\r\n        return mongoose;\r\n    }\r\n}\r\nexports.default = DataBase;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/config/DataBase.ts?");

/***/ }),

/***/ "./src/config/Variables.ts":
/*!*********************************!*\
  !*** ./src/config/Variables.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Variables {\r\n    constructor() {\r\n        this.mode = process.env.MODE_API;\r\n        this.jwtPrivateKey = process.env.JWTKEY_API;\r\n        this.port = process.env.PORT_API;\r\n        this.urlDb = process.env.URLDB_API;\r\n        this.checkVariables();\r\n    }\r\n    checkVariables() {\r\n        if (!this.mode)\r\n            throw new Error(\"ERROR: MODE api not found!\");\r\n        if (!this.jwtPrivateKey)\r\n            throw new Error(\"ERROR: JWT key api not found!\");\r\n        if (!this.port)\r\n            throw new Error(\"ERROR: Port api not found!\");\r\n        if (!this.urlDb)\r\n            throw new Error(\"ERROR: Url Connection Database api not found!\");\r\n    }\r\n    getVariables() {\r\n        return {\r\n            mode: this.mode,\r\n            jwtPrivateKey: this.jwtPrivateKey,\r\n            port: this.port,\r\n            urlDb: this.urlDb\r\n        };\r\n    }\r\n}\r\nexports.default = Variables;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/config/Variables.ts?");

/***/ }),

/***/ "./src/controllers/ControllerBase.ts":
/*!*******************************************!*\
  !*** ./src/controllers/ControllerBase.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass ControllerBase {\r\n    constructor({ params, query, headers, body, send, repository, user }) {\r\n        this.params = params;\r\n        this.query = query;\r\n        this.headers = headers;\r\n        this.body = body;\r\n        this.send = send;\r\n        this.repository = repository;\r\n        this.user = user;\r\n    }\r\n    error(err) {\r\n        const status = err.statusCode || err.status;\r\n        const statusCode = status || 500;\r\n        const message = err.message || err;\r\n        this.send(statusCode, message);\r\n    }\r\n    success(data) {\r\n        this.send(200, data);\r\n    }\r\n    createQueryRunner() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.repository.global.service.transactionService.createQueryRunner();\r\n        });\r\n    }\r\n    releaseQueryRunner(session) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.repository.global.service.transactionService.releaseQueryRunner(session);\r\n        });\r\n    }\r\n    startTransaction() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.repository.global.service.transactionService.startTransaction();\r\n        });\r\n    }\r\n    commitTransaction(session) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.repository.global.service.transactionService.commitTransaction(session);\r\n        });\r\n    }\r\n    rollbackTransaction(session) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.repository.global.service.transactionService.rollbackTransaction(session);\r\n        });\r\n    }\r\n    formatStringObject(dataObject, dataIgnore) {\r\n        const result = this.repository.global.service.formatStringObject.format(dataObject, dataIgnore);\r\n        return result;\r\n    }\r\n}\r\nexports.default = ControllerBase;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/controllers/ControllerBase.ts?");

/***/ }),

/***/ "./src/controllers/masters/ShopController.ts":
/*!***************************************************!*\
  !*** ./src/controllers/masters/ShopController.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst ControllerBase_1 = __webpack_require__(/*! ../ControllerBase */ \"./src/controllers/ControllerBase.ts\");\r\nclass ShopController extends ControllerBase_1.default {\r\n    addShop() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const { error } = this.repository.shop.validateAddShop(this.body.shopping);\r\n            if (error)\r\n                return this.error({\r\n                    statusCode: 400,\r\n                    message: error.details[0].message\r\n                });\r\n            const session = yield this.startTransaction();\r\n            let idna = \"\";\r\n            const getNo = yield this.repository.shop.genNo();\r\n            if (getNo) {\r\n                idna = \"N\" + String(Number(Number(String(getNo.id).slice(-4)) + Number(1))).padStart(4, '0');\r\n            }\r\n            else {\r\n                idna = \"N0001\";\r\n            }\r\n            try {\r\n                const formatedBody = this.body.shopping;\r\n                const newShop = {\r\n                    createddate: formatedBody.createddate,\r\n                    id: idna,\r\n                    name: formatedBody.name,\r\n                };\r\n                yield this.repository.shop.addShop(newShop, session);\r\n                yield this.commitTransaction(session);\r\n                var resultdata;\r\n                resultdata = {\r\n                    data: newShop\r\n                };\r\n                this.success(resultdata);\r\n            }\r\n            catch (err) {\r\n                yield this.rollbackTransaction(session);\r\n                this.error(err);\r\n            }\r\n        });\r\n    }\r\n    getShops() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const result = yield this.repository.shop.getShops();\r\n                this.success(result);\r\n            }\r\n            catch (err) {\r\n                this.error(err);\r\n            }\r\n        });\r\n    }\r\n    getShopById() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const result = yield this.repository.shop.getShopById(this.params.id);\r\n                this.success(result[0]);\r\n            }\r\n            catch (err) {\r\n                this.error(err);\r\n            }\r\n        });\r\n    }\r\n    updateShopById() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const { error } = this.repository.shop.validateUpdateShop(this.body.shopping);\r\n            if (error)\r\n                return this.error({\r\n                    statusCode: 400,\r\n                    message: error.details[0].message\r\n                });\r\n            const formatedBody = yield this.formatStringObject(this.body.shopping, []);\r\n            const session = yield this.startTransaction();\r\n            try {\r\n                const result = yield this.repository.shop.updateShopById(this.params.id, formatedBody, session);\r\n                yield this.commitTransaction(session);\r\n                this.success(result);\r\n            }\r\n            catch (err) {\r\n                yield this.rollbackTransaction(session);\r\n                this.error(err);\r\n            }\r\n        });\r\n    }\r\n    deleteShopById() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const session = yield this.startTransaction();\r\n            try {\r\n                const result = yield this.repository.shop.deleteShopById(this.params.id, session);\r\n                yield this.commitTransaction(session);\r\n                this.success(result);\r\n            }\r\n            catch (err) {\r\n                yield this.rollbackTransaction(session);\r\n                this.error(err);\r\n            }\r\n        });\r\n    }\r\n}\r\nexports.default = ShopController;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/controllers/masters/ShopController.ts?");

/***/ }),

/***/ "./src/controllers/masters/UserController.ts":
/*!***************************************************!*\
  !*** ./src/controllers/masters/UserController.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst ControllerBase_1 = __webpack_require__(/*! ../ControllerBase */ \"./src/controllers/ControllerBase.ts\");\r\nclass UserController extends ControllerBase_1.default {\r\n    loginUser() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const { error } = this.repository.users.validateLoginUser(this.body);\r\n                if (error) {\r\n                    return this.error({\r\n                        statusCode: 400,\r\n                        message: error.details[0].message\r\n                    });\r\n                }\r\n                const user = yield this.repository.users.getUserPassword(this.body.email);\r\n                if (!user) {\r\n                    return this.error({\r\n                        statusCode: 400,\r\n                        message: \"User id atau Password yang anda masukan salah!\"\r\n                    });\r\n                }\r\n                const matchPassword = yield this.repository.users.service.userService.comparePassword(this.body.password, user);\r\n                if (!matchPassword) {\r\n                    return this.error({\r\n                        statusCode: 400,\r\n                        message: \"User id atau Password yang anda masukan salah!\"\r\n                    });\r\n                }\r\n                const token = yield this.repository.users.service.security.generateToken(user);\r\n                if (!token) {\r\n                    return this.error({\r\n                        statusCode: 400,\r\n                        message: \"Gagal login, coba ulangi kembali!\"\r\n                    });\r\n                }\r\n                const result = {\r\n                    email: user.email,\r\n                    token: token,\r\n                    username: user.username,\r\n                };\r\n                yield this.repository.users.service.cacheData.storeCache(result);\r\n                this.success(result);\r\n            }\r\n            catch (err) {\r\n                this.error(err);\r\n            }\r\n        });\r\n    }\r\n    addUser() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const { error } = this.repository.users.validateAddUser(this.body.user);\r\n            if (error)\r\n                return this.error({\r\n                    statusCode: 400,\r\n                    message: error.details[0].message\r\n                });\r\n            const session = yield this.startTransaction();\r\n            try {\r\n                const formatedBody = this.body.user;\r\n                let CekUser = yield this.repository.users.getUserById(formatedBody.username);\r\n                if (CekUser) {\r\n                    yield this.rollbackTransaction(session);\r\n                    return this.error({\r\n                        statusCode: 400,\r\n                        message: \"Username sudah terdaftar!\"\r\n                    });\r\n                }\r\n                let CekEmail = yield this.repository.users.getUserByEmail(formatedBody.email);\r\n                if (CekEmail) {\r\n                    yield this.rollbackTransaction(session);\r\n                    return this.error({\r\n                        statusCode: 400,\r\n                        message: \"Email sudah terdaftar!\"\r\n                    });\r\n                }\r\n                const newUser = {\r\n                    username: formatedBody.username,\r\n                    password: formatedBody.password,\r\n                    email: formatedBody.email,\r\n                    phone: formatedBody.phone,\r\n                    country: formatedBody.country,\r\n                    city: formatedBody.city,\r\n                    postcode: formatedBody.postcode,\r\n                    name: formatedBody.name,\r\n                    address: formatedBody.address\r\n                };\r\n                const token = yield this.repository.users.service.security.generateToken(formatedBody.username);\r\n                newUser.password = yield this.repository.users.service.userService.hashPassword(newUser.password);\r\n                yield this.repository.users.addUser(newUser, session);\r\n                yield this.commitTransaction(session);\r\n                var resultdata;\r\n                resultdata = {\r\n                    \"email\": formatedBody.email,\r\n                    \"token\": token,\r\n                    \"username\": formatedBody.username\r\n                };\r\n                this.success(resultdata);\r\n            }\r\n            catch (err) {\r\n                yield this.rollbackTransaction(session);\r\n                this.error(err);\r\n            }\r\n        });\r\n    }\r\n    getUsers() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const result = yield this.repository.users.getUsers();\r\n                this.success(result);\r\n            }\r\n            catch (err) {\r\n                this.error(err);\r\n            }\r\n        });\r\n    }\r\n}\r\nexports.default = UserController;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/controllers/masters/UserController.ts?");

/***/ }),

/***/ "./src/controllers/utilities/SetupController.ts":
/*!******************************************************!*\
  !*** ./src/controllers/utilities/SetupController.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst ControllerBase_1 = __webpack_require__(/*! ../ControllerBase */ \"./src/controllers/ControllerBase.ts\");\r\nclass SetupController extends ControllerBase_1.default {\r\n    addAdminUser() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const session = yield this.startTransaction();\r\n            try {\r\n                let result = yield this.repository.users.getUserById(\"admin\");\r\n                if (result) {\r\n                    yield this.rollbackTransaction(session);\r\n                    return this.error({ statusCode: 400, message: \"User id sudah terdaftar!\" });\r\n                }\r\n                const newUser = {\r\n                    user_id: \"admin\",\r\n                    user_name: \"ADMIN\",\r\n                    level: \"OWN\",\r\n                    password: \"admin\",\r\n                    input_by: \"SYSTEM\",\r\n                    input_date: this.repository.users.service.dateService.localDateTime(),\r\n                    edit_by: \"-\",\r\n                    edit_date: this.repository.users.service.dateService.localDateTime()\r\n                };\r\n                newUser.password = yield this.repository.users.service.userService.hashPassword(newUser.password);\r\n                result = yield this.repository.users.addUser(newUser, session);\r\n                yield this.commitTransaction(session);\r\n                this.success(result);\r\n            }\r\n            catch (err) {\r\n                console.log(err.message);\r\n                yield this.rollbackTransaction(session);\r\n                this.error(err);\r\n            }\r\n        });\r\n    }\r\n    createTables() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const result = yield this.repository.setup.createTables();\r\n                this.success(result);\r\n            }\r\n            catch (err) {\r\n                this.error(err);\r\n            }\r\n        });\r\n    }\r\n    dropTables() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                if (this.params.kode !== \"seccreeet\")\r\n                    this.error({ statusCode: 400, message: \"FORBIDDEN ACCESS!!!\" });\r\n                const result = yield this.repository.setup.dropTables();\r\n                this.success(result);\r\n            }\r\n            catch (err) {\r\n                this.error(err);\r\n            }\r\n        });\r\n    }\r\n    runMigrations() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                yield this.repository.setup.runMigrations();\r\n                this.success(\"Run migration SUCCESS.\");\r\n            }\r\n            catch (err) {\r\n                this.error(err);\r\n            }\r\n        });\r\n    }\r\n}\r\nexports.default = SetupController;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/controllers/utilities/SetupController.ts?");

/***/ }),

/***/ "./src/docs/Documents.ts":
/*!*******************************!*\
  !*** ./src/docs/Documents.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst ServerDoc_1 = __webpack_require__(/*! ./ServerDoc */ \"./src/docs/ServerDoc.ts\");\r\nconst UsersDoc_1 = __webpack_require__(/*! ./masters/UsersDoc */ \"./src/docs/masters/UsersDoc.ts\");\r\nclass Documents {\r\n    constructor() {\r\n        this.serverDoc = new ServerDoc_1.default();\r\n        this.paths = {\r\n            \"paths\": Object.assign(new UsersDoc_1.default().getDoc())\r\n        };\r\n    }\r\n    getDoc() {\r\n        const swaggerDoc = Object.assign(this.serverDoc.getInfo(), this.paths);\r\n        return swaggerDoc;\r\n    }\r\n}\r\nexports.default = Documents;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/docs/Documents.ts?");

/***/ }),

/***/ "./src/docs/ServerDoc.ts":
/*!*******************************!*\
  !*** ./src/docs/ServerDoc.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst joiful_1 = __webpack_require__(/*! joiful */ \"joiful\");\r\nclass ServerDoc {\r\n    getInfo() {\r\n        return {\r\n            openapi: '3.0.1',\r\n            info: {\r\n                version: '1.0.0',\r\n                title: 'Ayu Grosir Api',\r\n                description: 'Rest api for ayu grosir',\r\n                termsOfService: 'http://api_url/terms/',\r\n                contact: {\r\n                    name: 'Eri Samsudin',\r\n                    email: 'erisamsudin@gmail.com',\r\n                    url: '-'\r\n                },\r\n                license: {\r\n                    name: 'MIT',\r\n                    url: 'https://opensource.org/licenses/MIT'\r\n                }\r\n            },\r\n            servers: [\r\n                {\r\n                    url: 'http://localhost:7001/api/v1',\r\n                    description: 'Local server'\r\n                },\r\n                {\r\n                    url: 'http://192.168.1.16:7001/api/v1',\r\n                    description: 'Network server'\r\n                }\r\n            ],\r\n            security: [\r\n                {\r\n                    ApiKeyAuth: joiful_1.any\r\n                }\r\n            ],\r\n            tags: [\r\n                {\r\n                    name: \"Users\",\r\n                    description: \"End point users.\"\r\n                }\r\n            ]\r\n        };\r\n    }\r\n}\r\nexports.default = ServerDoc;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/docs/ServerDoc.ts?");

/***/ }),

/***/ "./src/docs/masters/UsersDoc.ts":
/*!**************************************!*\
  !*** ./src/docs/masters/UsersDoc.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass UsersDoc {\r\n    getDoc() {\r\n        return {\r\n            \"/users/login\": {\r\n                post: {\r\n                    tags: [\"Users\"],\r\n                    description: \"Login user.\",\r\n                    operationId: \"loginUser\",\r\n                    requestBody: {\r\n                        content: {\r\n                            \"application/json\": {\r\n                                schema: {\r\n                                    type: \"object\",\r\n                                    properties: {\r\n                                        user_id: {\r\n                                            type: \"string\"\r\n                                        },\r\n                                        password: {\r\n                                            type: \"string\"\r\n                                        }\r\n                                    }\r\n                                }\r\n                            }\r\n                        },\r\n                        requred: true\r\n                    },\r\n                    responses: {}\r\n                }\r\n            },\r\n            \"/users/get/all\": {\r\n                get: {\r\n                    tags: [\"Users\"],\r\n                    description: \"Get User All\",\r\n                    operationId: \"getUserAll\",\r\n                    parameters: [\r\n                        {\r\n                            name: \"x-auth-token\",\r\n                            in: \"header\",\r\n                            schema: {\r\n                                type: \"string\"\r\n                            },\r\n                            required: true\r\n                        }\r\n                    ],\r\n                    responses: {}\r\n                }\r\n            },\r\n            \"/users/get/id/{user_id}\": {\r\n                get: {\r\n                    tags: [\"Users\"],\r\n                    description: \"Get User By user_id\",\r\n                    operationId: \"getUserById\",\r\n                    parameters: [\r\n                        {\r\n                            name: \"x-auth-token\",\r\n                            in: \"header\",\r\n                            schema: {\r\n                                type: \"string\"\r\n                            },\r\n                            required: true\r\n                        },\r\n                        {\r\n                            name: \"user_id\",\r\n                            in: \"path\",\r\n                            schema: {\r\n                                type: \"string\"\r\n                            },\r\n                            required: true\r\n                        }\r\n                    ],\r\n                    responses: {}\r\n                }\r\n            },\r\n            \"/users/add/user\": {\r\n                post: {\r\n                    tags: [\"Users\"],\r\n                    description: \"Add new user\",\r\n                    operationId: \"addNewUser\",\r\n                    parameters: [\r\n                        {\r\n                            name: \"x-auth-token\",\r\n                            in: \"header\",\r\n                            schema: {\r\n                                type: \"string\"\r\n                            },\r\n                            required: true\r\n                        }\r\n                    ],\r\n                    requestBody: {\r\n                        content: {\r\n                            \"application/json\": {\r\n                                schema: {\r\n                                    type: \"object\",\r\n                                    properties: {\r\n                                        user_id: {\r\n                                            type: \"string\"\r\n                                        },\r\n                                        user_name: {\r\n                                            type: \"string\"\r\n                                        },\r\n                                        level: {\r\n                                            type: \"string\"\r\n                                        },\r\n                                        password: {\r\n                                            type: \"string\"\r\n                                        },\r\n                                        retype_password: {\r\n                                            type: \"string\"\r\n                                        }\r\n                                    },\r\n                                }\r\n                            }\r\n                        },\r\n                        required: true\r\n                    },\r\n                    responses: {}\r\n                }\r\n            },\r\n            \"/users/update/id/{user_id}\": {\r\n                put: {\r\n                    tags: [\"Users\"],\r\n                    description: \"Update data user\",\r\n                    operationId: \"updateDataUser\",\r\n                    parameters: [\r\n                        {\r\n                            name: \"x-auth-token\",\r\n                            in: \"header\",\r\n                            schema: {\r\n                                type: \"string\"\r\n                            },\r\n                            required: true\r\n                        },\r\n                        {\r\n                            name: \"user_id\",\r\n                            in: \"path\",\r\n                            schema: {\r\n                                type: \"string\"\r\n                            },\r\n                            required: true\r\n                        }\r\n                    ],\r\n                    requestBody: {\r\n                        content: {\r\n                            \"application/json\": {\r\n                                schema: {\r\n                                    type: \"object\",\r\n                                    properties: {\r\n                                        user_name: {\r\n                                            type: \"string\"\r\n                                        },\r\n                                        level: {\r\n                                            type: \"string\"\r\n                                        }\r\n                                    },\r\n                                }\r\n                            }\r\n                        },\r\n                        required: true\r\n                    },\r\n                    responses: {}\r\n                }\r\n            },\r\n            \"/users/change-password\": {\r\n                put: {\r\n                    tags: [\"Users\"],\r\n                    description: \"Change password\",\r\n                    operationId: \"changePassword\",\r\n                    parameters: [\r\n                        {\r\n                            name: \"x-auth-token\",\r\n                            in: \"header\",\r\n                            schema: {\r\n                                type: \"string\"\r\n                            },\r\n                            required: true\r\n                        }\r\n                    ],\r\n                    requestBody: {\r\n                        content: {\r\n                            \"application/json\": {\r\n                                schema: {\r\n                                    type: \"object\",\r\n                                    properties: {\r\n                                        password: {\r\n                                            type: \"string\"\r\n                                        },\r\n                                        new_password: {\r\n                                            type: \"string\"\r\n                                        },\r\n                                        retype_new_password: {\r\n                                            type: \"string\"\r\n                                        }\r\n                                    }\r\n                                }\r\n                            }\r\n                        },\r\n                        required: true\r\n                    },\r\n                    responses: {}\r\n                }\r\n            }\r\n        };\r\n    }\r\n}\r\nexports.default = UsersDoc;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/docs/masters/UsersDoc.ts?");

/***/ }),

/***/ "./src/entities/masters/ShopEntity.ts":
/*!********************************************!*\
  !*** ./src/entities/masters/ShopEntity.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.ValidUpdateShop = exports.ValidAddShop = exports.Shop = void 0;\r\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst jf = __webpack_require__(/*! joiful */ \"joiful\");\r\nclass Shop {\r\n    constructor() {\r\n        const shopSchema = new mongoose_1.Schema({\r\n            id: String,\r\n            name: String,\r\n            createddate: String,\r\n        });\r\n        shopSchema.index({ id: 1 }, { unique: true });\r\n        const Shop = mongoose_1.model('shopping', shopSchema, 'shopping');\r\n        return Shop;\r\n    }\r\n}\r\nexports.Shop = Shop;\r\nclass ValidAddShop {\r\n}\r\n__decorate([\r\n    jf.string().required(),\r\n    __metadata(\"design:type\", String)\r\n], ValidAddShop.prototype, \"name\", void 0);\r\n__decorate([\r\n    jf.string().required(),\r\n    __metadata(\"design:type\", String)\r\n], ValidAddShop.prototype, \"createddate\", void 0);\r\nexports.ValidAddShop = ValidAddShop;\r\nclass ValidUpdateShop {\r\n}\r\n__decorate([\r\n    jf.string().required(),\r\n    __metadata(\"design:type\", String)\r\n], ValidUpdateShop.prototype, \"name\", void 0);\r\n__decorate([\r\n    jf.string().required(),\r\n    __metadata(\"design:type\", String)\r\n], ValidUpdateShop.prototype, \"createddate\", void 0);\r\nexports.ValidUpdateShop = ValidUpdateShop;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/entities/masters/ShopEntity.ts?");

/***/ }),

/***/ "./src/entities/masters/UserEntity.ts":
/*!********************************************!*\
  !*** ./src/entities/masters/UserEntity.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.ValidLoginUser = exports.ValidAddUser = exports.User = void 0;\r\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst jf = __webpack_require__(/*! joiful */ \"joiful\");\r\nclass User {\r\n    constructor() {\r\n        const userSchema = new mongoose_1.Schema({\r\n            username: String,\r\n            password: String,\r\n            email: String,\r\n            phone: String,\r\n            country: String,\r\n            city: String,\r\n            postcode: String,\r\n            name: String,\r\n            address: String\r\n        });\r\n        userSchema.index({ username: 1 }, { unique: true });\r\n        const User = mongoose_1.model('user', userSchema, 'user');\r\n        return User;\r\n    }\r\n}\r\nexports.User = User;\r\nclass ValidAddUser {\r\n}\r\n__decorate([\r\n    jf.string().required(),\r\n    __metadata(\"design:type\", String)\r\n], ValidAddUser.prototype, \"username\", void 0);\r\n__decorate([\r\n    jf.string().required(),\r\n    __metadata(\"design:type\", String)\r\n], ValidAddUser.prototype, \"password\", void 0);\r\n__decorate([\r\n    jf.string().required(),\r\n    __metadata(\"design:type\", String)\r\n], ValidAddUser.prototype, \"email\", void 0);\r\n__decorate([\r\n    jf.string().required(),\r\n    __metadata(\"design:type\", String)\r\n], ValidAddUser.prototype, \"country\", void 0);\r\n__decorate([\r\n    jf.string().required(),\r\n    __metadata(\"design:type\", String)\r\n], ValidAddUser.prototype, \"phone\", void 0);\r\n__decorate([\r\n    jf.string().required(),\r\n    __metadata(\"design:type\", String)\r\n], ValidAddUser.prototype, \"city\", void 0);\r\n__decorate([\r\n    jf.string().required(),\r\n    __metadata(\"design:type\", String)\r\n], ValidAddUser.prototype, \"postcode\", void 0);\r\n__decorate([\r\n    jf.string().required(),\r\n    __metadata(\"design:type\", String)\r\n], ValidAddUser.prototype, \"name\", void 0);\r\n__decorate([\r\n    jf.string().required(),\r\n    __metadata(\"design:type\", String)\r\n], ValidAddUser.prototype, \"address\", void 0);\r\nexports.ValidAddUser = ValidAddUser;\r\nclass ValidLoginUser {\r\n}\r\n__decorate([\r\n    jf.string().required(),\r\n    __metadata(\"design:type\", String)\r\n], ValidLoginUser.prototype, \"email\", void 0);\r\n__decorate([\r\n    jf.string().required(),\r\n    __metadata(\"design:type\", String)\r\n], ValidLoginUser.prototype, \"password\", void 0);\r\nexports.ValidLoginUser = ValidLoginUser;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/entities/masters/UserEntity.ts?");

/***/ }),

/***/ "./src/repositories/Repository.ts":
/*!****************************************!*\
  !*** ./src/repositories/Repository.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst RepositoryBase_1 = __webpack_require__(/*! ./RepositoryBase */ \"./src/repositories/RepositoryBase.ts\");\r\nconst SetupReposirories_1 = __webpack_require__(/*! ./utilities/SetupReposirories */ \"./src/repositories/utilities/SetupReposirories.ts\");\r\nconst UserRepositories_1 = __webpack_require__(/*! ./masters/UserRepositories */ \"./src/repositories/masters/UserRepositories.ts\");\r\nconst ShopRepositories_1 = __webpack_require__(/*! ./masters/ShopRepositories */ \"./src/repositories/masters/ShopRepositories.ts\");\r\nclass Repository {\r\n    constructor(db, jf, service) {\r\n        this._db = db;\r\n        this._jf = jf;\r\n        this._service = service;\r\n    }\r\n    registerRepositories() {\r\n        this.global = new RepositoryBase_1.default(this._db, this._jf, this._service, []);\r\n        this.setup = new SetupReposirories_1.default(this._db, this._jf, this._service);\r\n        this.users = new UserRepositories_1.default(this._db, this._jf, this._service);\r\n        this.shop = new ShopRepositories_1.default(this._db, this._jf, this._service);\r\n    }\r\n}\r\nexports.default = Repository;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/repositories/Repository.ts?");

/***/ }),

/***/ "./src/repositories/RepositoryBase.ts":
/*!********************************************!*\
  !*** ./src/repositories/RepositoryBase.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass RepositoryBase {\r\n    constructor(db, jf, service, sendColumn) {\r\n        this.db = db;\r\n        this.jf = jf;\r\n        this.sendColumn = sendColumn;\r\n        this.service = service;\r\n    }\r\n}\r\nexports.default = RepositoryBase;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/repositories/RepositoryBase.ts?");

/***/ }),

/***/ "./src/repositories/masters/ShopRepositories.ts":
/*!******************************************************!*\
  !*** ./src/repositories/masters/ShopRepositories.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst RepositoryBase_1 = __webpack_require__(/*! ../RepositoryBase */ \"./src/repositories/RepositoryBase.ts\");\r\nconst ShopEntity_1 = __webpack_require__(/*! ../../entities/masters/ShopEntity */ \"./src/entities/masters/ShopEntity.ts\");\r\nclass ShopRepositories extends RepositoryBase_1.default {\r\n    constructor(db, jf, service) {\r\n        const sendColumn = {\r\n            \"createddate\": \"$createddate\",\r\n            \"id\": \"$id\",\r\n            \"name\": \"$name\"\r\n        };\r\n        super(db, jf, service, sendColumn);\r\n        this.shop = new ShopEntity_1.Shop();\r\n    }\r\n    validateAddShop(ShopData) {\r\n        const result = this.jf.validateAsClass(ShopData, ShopEntity_1.ValidAddShop);\r\n        return result;\r\n    }\r\n    validateUpdateShop(ShopData) {\r\n        const result = this.jf.validateAsClass(ShopData, ShopEntity_1.ValidUpdateShop);\r\n        return result;\r\n    }\r\n    getShopById(idna) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const shops = this.shop.aggregate([\r\n                { \"$match\": { id: idna } },\r\n                { \"$project\": this.sendColumn }\r\n            ]);\r\n            return shops;\r\n        });\r\n    }\r\n    getShops() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const shops = this.shop.aggregate([\r\n                { \"$project\": this.sendColumn }\r\n            ]);\r\n            return shops;\r\n        });\r\n    }\r\n    addShop(newShop, session) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const user = new this.shop(newShop);\r\n            yield user.save({ session: session });\r\n            return \"Add Shop Berhasil\";\r\n        });\r\n    }\r\n    genNo() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const result = yield this.shop.aggregate([\r\n                { \"$sort\": { id: -1 } }\r\n            ]);\r\n            return result[0];\r\n        });\r\n    }\r\n    updateShopById(idna, dataBody, session) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const result = yield this.shop.findOneAndUpdate({ id: idna }, dataBody, { session });\r\n            if (!result)\r\n                throw new Error(`Data Shopping: ${idna} tidak di temukan, Update GAGAL!`);\r\n            return (`Update data Shopping: ${idna} BERHASIL!`);\r\n        });\r\n    }\r\n    deleteShopById(idna, session) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const result = yield this.shop.findOneAndDelete({ id: idna }, { session });\r\n            if (!result)\r\n                throw new Error(`Data Shopping: ${idna} tidak di temukan, Delete data user GAGAL!`);\r\n            return `Delete Shopping: ${idna} BERHASIL.`;\r\n        });\r\n    }\r\n}\r\nexports.default = ShopRepositories;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/repositories/masters/ShopRepositories.ts?");

/***/ }),

/***/ "./src/repositories/masters/UserRepositories.ts":
/*!******************************************************!*\
  !*** ./src/repositories/masters/UserRepositories.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst RepositoryBase_1 = __webpack_require__(/*! ../RepositoryBase */ \"./src/repositories/RepositoryBase.ts\");\r\nconst UserEntity_1 = __webpack_require__(/*! ../../entities/masters/UserEntity */ \"./src/entities/masters/UserEntity.ts\");\r\nclass UserRepositories extends RepositoryBase_1.default {\r\n    constructor(db, jf, service) {\r\n        const sendColumn = {\r\n            \"username\": \"$username\",\r\n            \"email\": \"$email\",\r\n            \"phone\": \"$phone\",\r\n            \"country\": \"$country\",\r\n            \"city\": \"$city\",\r\n            \"postcode\": \"$postcode\",\r\n            \"name\": \"$name\",\r\n            \"address\": \"$address\"\r\n        };\r\n        super(db, jf, service, sendColumn);\r\n        this.user = new UserEntity_1.User();\r\n    }\r\n    validateAddUser(userData) {\r\n        const result = this.jf.validateAsClass(userData, UserEntity_1.ValidAddUser);\r\n        return result;\r\n    }\r\n    validateLoginUser(userData) {\r\n        const result = this.jf.validateAsClass(userData, UserEntity_1.ValidLoginUser);\r\n        return result;\r\n    }\r\n    getUserById(username) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const users = yield this.user.findOne({ username });\r\n            return users;\r\n        });\r\n    }\r\n    getUserByEmail(email) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const users = yield this.user.findOne({ email });\r\n            return users;\r\n        });\r\n    }\r\n    getUsers() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const users = this.user.aggregate([\r\n                { \"$project\": this.sendColumn }\r\n            ]);\r\n            return users;\r\n        });\r\n    }\r\n    getUserPassword(email) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const users = yield this.user.findOne({ email });\r\n            return users;\r\n        });\r\n    }\r\n    addUser(newUser, session) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const user = new this.user(newUser);\r\n            yield user.save({ session: session });\r\n            return \"Save data user BERHASIL\";\r\n        });\r\n    }\r\n}\r\nexports.default = UserRepositories;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/repositories/masters/UserRepositories.ts?");

/***/ }),

/***/ "./src/repositories/utilities/SetupReposirories.ts":
/*!*********************************************************!*\
  !*** ./src/repositories/utilities/SetupReposirories.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst RepositoryBase_1 = __webpack_require__(/*! ../RepositoryBase */ \"./src/repositories/RepositoryBase.ts\");\r\nclass GroupRepositories extends RepositoryBase_1.default {\r\n    constructor(db, jf, service) {\r\n        super(db, jf, service, []);\r\n    }\r\n}\r\nexports.default = GroupRepositories;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/repositories/utilities/SetupReposirories.ts?");

/***/ }),

/***/ "./src/routes/Routes.ts":
/*!******************************!*\
  !*** ./src/routes/Routes.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst RoutesCollection_1 = __webpack_require__(/*! ./RoutesCollection */ \"./src/routes/RoutesCollection.ts\");\r\nconst SetupRoutes_1 = __webpack_require__(/*! ./utilities/SetupRoutes */ \"./src/routes/utilities/SetupRoutes.ts\");\r\nconst UserRoutes_1 = __webpack_require__(/*! ./masters/UserRoutes */ \"./src/routes/masters/UserRoutes.ts\");\r\nconst ShopRoutes_1 = __webpack_require__(/*! ./masters/ShopRoutes */ \"./src/routes/masters/ShopRoutes.ts\");\r\nclass Routes {\r\n    constructor() {\r\n        this.routeBuilders = [\r\n            new SetupRoutes_1.default(),\r\n            new UserRoutes_1.default(),\r\n            new ShopRoutes_1.default(),\r\n        ];\r\n    }\r\n    registerRoutes(registerRouteCallback, createRouteBoundAction) {\r\n        this.routeBuilders.map((builder) => {\r\n            const routes = builder.getRoutes();\r\n            routes.map((routeData) => {\r\n                RoutesCollection_1.default.addRouteData(routeData.controllerClass, routeData.action, {\r\n                    uri: routeData.uri, httpMethod: routeData.httpMethod\r\n                });\r\n                const boundAction = createRouteBoundAction(routeData.controllerClass, routeData.action, routeData.isSecure);\r\n                registerRouteCallback(routeData.uri, routeData.httpMethod, boundAction);\r\n            });\r\n        });\r\n    }\r\n}\r\nexports.default = Routes;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/routes/Routes.ts?");

/***/ }),

/***/ "./src/routes/RoutesBase.ts":
/*!**********************************!*\
  !*** ./src/routes/RoutesBase.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass RouteBase {\r\n    constructor(controllerClass) {\r\n        this.routes = [];\r\n        this.ControllerClass = controllerClass;\r\n    }\r\n    buildRoute(uri, httpMethod, action, isSecure = false) {\r\n        this.routes.push({\r\n            controllerClass: this.ControllerClass,\r\n            uri,\r\n            httpMethod,\r\n            action,\r\n            isSecure\r\n        });\r\n    }\r\n}\r\nexports.default = RouteBase;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/routes/RoutesBase.ts?");

/***/ }),

/***/ "./src/routes/RoutesCollection.ts":
/*!****************************************!*\
  !*** ./src/routes/RoutesCollection.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass RoutesCollection {\r\n    static addRouteData(controller, action, routeData) {\r\n        routeData.controller = controller.name;\r\n        routeData.action = action;\r\n        this.routesCollection = RoutesCollection;\r\n        if (!this.routesCollection[controller.name])\r\n            this.routesCollection[controller.name] = {};\r\n        this.routesCollection[controller.name] = Object.assign({}, this.routesCollection[controller.name], {\r\n            [action]: routeData\r\n        });\r\n    }\r\n}\r\nexports.default = RoutesCollection;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/routes/RoutesCollection.ts?");

/***/ }),

/***/ "./src/routes/masters/ShopRoutes.ts":
/*!******************************************!*\
  !*** ./src/routes/masters/ShopRoutes.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst RoutesBase_1 = __webpack_require__(/*! ../RoutesBase */ \"./src/routes/RoutesBase.ts\");\r\nconst ShopController_1 = __webpack_require__(/*! ../../controllers/masters/ShopController */ \"./src/controllers/masters/ShopController.ts\");\r\nclass ShopRoutes extends RoutesBase_1.default {\r\n    constructor() {\r\n        super(ShopController_1.default);\r\n    }\r\n    getRoutes() {\r\n        this.buildRoute(\"/shopping\", \"post\", \"addShop\", true);\r\n        this.buildRoute(\"/shopping\", \"get\", \"getShops\", true);\r\n        this.buildRoute(\"/shopping/:id\", \"get\", \"getShopById\", true);\r\n        this.buildRoute(\"/shopping/:id\", \"put\", \"updateShopById\", true);\r\n        this.buildRoute(\"/shopping/:id\", \"delete\", \"deleteShopById\", true);\r\n        return this.routes;\r\n    }\r\n}\r\nexports.default = ShopRoutes;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/routes/masters/ShopRoutes.ts?");

/***/ }),

/***/ "./src/routes/masters/UserRoutes.ts":
/*!******************************************!*\
  !*** ./src/routes/masters/UserRoutes.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst RoutesBase_1 = __webpack_require__(/*! ../RoutesBase */ \"./src/routes/RoutesBase.ts\");\r\nconst UserController_1 = __webpack_require__(/*! ../../controllers/masters/UserController */ \"./src/controllers/masters/UserController.ts\");\r\nclass UserRoutes extends RoutesBase_1.default {\r\n    constructor() {\r\n        super(UserController_1.default);\r\n    }\r\n    getRoutes() {\r\n        this.buildRoute(\"/users/signup\", \"post\", \"addUser\", true);\r\n        this.buildRoute(\"/users/signin\", \"post\", \"loginUser\");\r\n        this.buildRoute(\"/users\", \"get\", \"getUsers\", true);\r\n        return this.routes;\r\n    }\r\n}\r\nexports.default = UserRoutes;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/routes/masters/UserRoutes.ts?");

/***/ }),

/***/ "./src/routes/utilities/SetupRoutes.ts":
/*!*********************************************!*\
  !*** ./src/routes/utilities/SetupRoutes.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst RoutesBase_1 = __webpack_require__(/*! ../RoutesBase */ \"./src/routes/RoutesBase.ts\");\r\nconst SetupController_1 = __webpack_require__(/*! ../../controllers/utilities/SetupController */ \"./src/controllers/utilities/SetupController.ts\");\r\nclass UserRoutes extends RoutesBase_1.default {\r\n    constructor() {\r\n        super(SetupController_1.default);\r\n    }\r\n    getRoutes() {\r\n        this.buildRoute(\"/setup/user-admin\", \"post\", \"addAdminUser\");\r\n        this.buildRoute(\"/setup/create-tables\", \"post\", \"createTables\");\r\n        this.buildRoute(\"/setup/drop-tables/:kode\", \"delete\", \"dropTables\");\r\n        this.buildRoute(\"/setup/run-migrations\", \"post\", \"runMigrations\");\r\n        return this.routes;\r\n    }\r\n}\r\nexports.default = UserRoutes;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/routes/utilities/SetupRoutes.ts?");

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\n__webpack_require__(/*! regenerator-runtime */ \"regenerator-runtime\");\r\n__webpack_require__(/*! reflect-metadata */ \"reflect-metadata\");\r\nconst dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\r\nconst jf = __webpack_require__(/*! joiful */ \"joiful\");\r\nconst App_1 = __webpack_require__(/*! ./App */ \"./src/App.ts\");\r\nconst Variables_1 = __webpack_require__(/*! ./config/Variables */ \"./src/config/Variables.ts\");\r\nconst Routes_1 = __webpack_require__(/*! ./routes/Routes */ \"./src/routes/Routes.ts\");\r\nconst Repository_1 = __webpack_require__(/*! ./repositories/Repository */ \"./src/repositories/Repository.ts\");\r\nconst DataBase_1 = __webpack_require__(/*! ./config/DataBase */ \"./src/config/DataBase.ts\");\r\nconst Services_1 = __webpack_require__(/*! ./services/Services */ \"./src/services/Services.ts\");\r\nconst Logger_1 = __webpack_require__(/*! ./services/Logger */ \"./src/services/Logger.ts\");\r\ndotenv.config();\r\nconst variables = new Variables_1.default();\r\nconst dataBase = new DataBase_1.default(variables.getVariables(), new Logger_1.default());\r\nconst service = new Services_1.default(dataBase, variables.getVariables());\r\nconst app = new App_1.default(new Routes_1.default, new Repository_1.default(dataBase, jf, service), variables.getVariables(), service);\r\napp.start();\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/server.ts?");

/***/ }),

/***/ "./src/services/CacheData.ts":
/*!***********************************!*\
  !*** ./src/services/CacheData.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst NodeCache = __webpack_require__(/*! node-cache */ \"node-cache\");\r\nclass CacheData {\r\n    constructor() {\r\n        this.nodeCache = new NodeCache();\r\n        this._ttl = 1200;\r\n    }\r\n    storeCache(dataStore) {\r\n        const result = this.nodeCache.set(dataStore.email, { token: dataStore.token }, this._ttl);\r\n        return result;\r\n    }\r\n    getCache(dataStore) {\r\n        const result = this.nodeCache.get(dataStore.email);\r\n        return result;\r\n    }\r\n    changeTTL(dataStore) {\r\n        const result = this.nodeCache.ttl(dataStore.email, this._ttl);\r\n        return result;\r\n    }\r\n    deleteCache(dataStore) {\r\n        const result = this.nodeCache.del(dataStore.email);\r\n        return result;\r\n    }\r\n}\r\nexports.default = CacheData;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/services/CacheData.ts?");

/***/ }),

/***/ "./src/services/DateService.ts":
/*!*************************************!*\
  !*** ./src/services/DateService.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst moment = __webpack_require__(/*! moment-timezone */ \"moment-timezone\");\r\nclass DateService {\r\n    localDateTime() {\r\n        const date = moment.tz(new Date(), \"Asia/Jakarta\").format(\"YYYY-MM-DD HH:mm:ss\");\r\n        return date;\r\n    }\r\n    localDate() {\r\n        const date = (moment.tz(new Date(), \"Asia/Jakarta\").format(\"YYYY-MM-DD\") + \" 00:00:00\");\r\n        return date;\r\n    }\r\n    localTime() {\r\n        const date = moment.tz(new Date(), \"Asia/Jakarta\").format(\"HH:mm:ss\");\r\n        return date;\r\n    }\r\n}\r\nexports.default = DateService;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/services/DateService.ts?");

/***/ }),

/***/ "./src/services/FormatStringObject.ts":
/*!********************************************!*\
  !*** ./src/services/FormatStringObject.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass FormatStringObject {\r\n    format(dataObject, ignoreObject) {\r\n        if (!Array.isArray(dataObject)) {\r\n            this.doFormat(dataObject, ignoreObject);\r\n        }\r\n        else {\r\n            dataObject.map((object) => {\r\n                this.doFormat(object, ignoreObject);\r\n            });\r\n        }\r\n        return dataObject;\r\n    }\r\n    doFormat(dataObject, ignoreObject) {\r\n        Object.keys(dataObject).map((key, index) => {\r\n            if (typeof dataObject[key] === \"string\") {\r\n                const resultCek = ignoreObject.find((element) => String(element).toUpperCase().trim() === String(key).toUpperCase().trim());\r\n                if (!resultCek) {\r\n                    dataObject[key] = String(dataObject[key]).toUpperCase().trim();\r\n                }\r\n            }\r\n        });\r\n        return dataObject;\r\n    }\r\n}\r\nexports.default = FormatStringObject;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/services/FormatStringObject.ts?");

/***/ }),

/***/ "./src/services/Logger.ts":
/*!********************************!*\
  !*** ./src/services/Logger.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst winston = __webpack_require__(/*! winston */ \"winston\");\r\nclass Logger {\r\n    constructor() {\r\n        this.logger = winston.createLogger({\r\n            level: \"info\",\r\n            format: winston.format.json(),\r\n            transports: [\r\n                new winston.transports.File({ filename: \"log/error.log\", level: \"error\" }),\r\n                new winston.transports.Console({ level: \"info\", format: winston.format.combine(winston.format.colorize(), winston.format.simple()) })\r\n            ],\r\n            exceptionHandlers: [\r\n                new winston.transports.File({ filename: \"log/exceptions.log\" }),\r\n                new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) })\r\n            ]\r\n        });\r\n    }\r\n    info(message) {\r\n        this.logger.log({\r\n            level: \"info\",\r\n            message: message\r\n        });\r\n    }\r\n    error(message) {\r\n        this.logger.log({\r\n            level: \"error\",\r\n            message: message\r\n        });\r\n    }\r\n}\r\nexports.default = Logger;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/services/Logger.ts?");

/***/ }),

/***/ "./src/services/Security.ts":
/*!**********************************!*\
  !*** ./src/services/Security.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\r\nclass Security {\r\n    constructor(variables, cacheData) {\r\n        this.mode = variables.mode;\r\n        this.jwtPrivateKey = variables.jwtPrivateKey;\r\n        this.cacheData = cacheData;\r\n    }\r\n    generateToken(userData) {\r\n        const token = jwt.sign({\r\n            email: userData.email\r\n        }, this.jwtPrivateKey);\r\n        return token;\r\n    }\r\n    authenticate() {\r\n        return [\r\n            (req, res, next) => {\r\n                const gettoken = req.headers[\"authorization\"];\r\n                const token = gettoken.replace('Bearer ', '');\r\n                req.autor;\r\n                if (!token)\r\n                    return res.status(401).send(\"Access denied. No token provided.\");\r\n                try {\r\n                    const decoded = jwt.verify(token, this.jwtPrivateKey);\r\n                    req.user = decoded;\r\n                    if (this.mode === \"production\") {\r\n                        const cacheToken = this.cacheData.getCache(req.user);\r\n                        if (cacheToken.token !== token)\r\n                            return res.status(400).send(\"Invalid token.\");\r\n                        this.cacheData.changeTTL(req.user);\r\n                    }\r\n                    next();\r\n                }\r\n                catch (err) {\r\n                    res.status(400).send(\"Invalid token.\");\r\n                }\r\n            }\r\n        ];\r\n    }\r\n}\r\nexports.default = Security;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/services/Security.ts?");

/***/ }),

/***/ "./src/services/Services.ts":
/*!**********************************!*\
  !*** ./src/services/Services.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst CacheData_1 = __webpack_require__(/*! ./CacheData */ \"./src/services/CacheData.ts\");\r\nconst Logger_1 = __webpack_require__(/*! ./Logger */ \"./src/services/Logger.ts\");\r\nconst Security_1 = __webpack_require__(/*! ./Security */ \"./src/services/Security.ts\");\r\nconst UserService_1 = __webpack_require__(/*! ./UserService */ \"./src/services/UserService.ts\");\r\nconst DateService_1 = __webpack_require__(/*! ./DateService */ \"./src/services/DateService.ts\");\r\nconst TransactionService_1 = __webpack_require__(/*! ./TransactionService */ \"./src/services/TransactionService.ts\");\r\nconst FormatStringObject_1 = __webpack_require__(/*! ./FormatStringObject */ \"./src/services/FormatStringObject.ts\");\r\nclass Services {\r\n    constructor(db, variables) {\r\n        this.db = db;\r\n        this.variables = variables;\r\n        this.registerService();\r\n    }\r\n    registerService() {\r\n        this.cacheData = new CacheData_1.default();\r\n        this.logger = new Logger_1.default();\r\n        this.security = new Security_1.default(this.variables, this.cacheData);\r\n        this.userService = new UserService_1.default();\r\n        this.dateService = new DateService_1.default();\r\n        this.transactionService = new TransactionService_1.default(this.db);\r\n        this.formatStringObject = new FormatStringObject_1.default();\r\n    }\r\n}\r\nexports.default = Services;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/services/Services.ts?");

/***/ }),

/***/ "./src/services/TransactionService.ts":
/*!********************************************!*\
  !*** ./src/services/TransactionService.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass TransactionService {\r\n    constructor(db) {\r\n        this.db = db;\r\n        this.createQueryRunner();\r\n    }\r\n    reconnectDB() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const result = yield this.db.connect();\r\n            return result;\r\n        });\r\n    }\r\n    createQueryRunner() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n        });\r\n    }\r\n    getMetaData(entity) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const result = yield this.db.getDb().getConnection().getMetadata(entity);\r\n            return result;\r\n        });\r\n    }\r\n    createNewTable(metaData) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const result = yield this.db.getDb().Table.create(metaData);\r\n            return result;\r\n        });\r\n    }\r\n    releaseQueryRunner() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.queryRunner.release();\r\n        });\r\n    }\r\n    startTransaction() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const session = yield this.db.getDb().startSession();\r\n            yield session.startTransaction();\r\n            return session;\r\n        });\r\n    }\r\n    commitTransaction(session) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield session.commitTransaction();\r\n            yield session.endSession();\r\n        });\r\n    }\r\n    rollbackTransaction(session) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield session.abortTransaction();\r\n            yield session.endSession();\r\n        });\r\n    }\r\n}\r\nexports.default = TransactionService;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/services/TransactionService.ts?");

/***/ }),

/***/ "./src/services/UserService.ts":
/*!*************************************!*\
  !*** ./src/services/UserService.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst bcrypt = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\r\nclass UserService {\r\n    hashPassword(password) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const salt = yield bcrypt.genSalt(10);\r\n            const encryptPassword = yield bcrypt.hash(password, salt);\r\n            return encryptPassword;\r\n        });\r\n    }\r\n    comparePassword(password, userData) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const validPassword = yield bcrypt.compare(password, userData.password);\r\n            if (!validPassword)\r\n                return validPassword;\r\n            return validPassword;\r\n        });\r\n    }\r\n}\r\nexports.default = UserService;\r\n\n\n//# sourceURL=webpack://shop-rest-api/./src/services/UserService.ts?");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");;

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");;

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");;

/***/ }),

/***/ "joiful":
/*!*************************!*\
  !*** external "joiful" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("joiful");;

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");;

/***/ }),

/***/ "moment-timezone":
/*!**********************************!*\
  !*** external "moment-timezone" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("moment-timezone");;

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");;

/***/ }),

/***/ "node-cache":
/*!*****************************!*\
  !*** external "node-cache" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("node-cache");;

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("reflect-metadata");;

/***/ }),

/***/ "regenerator-runtime":
/*!**************************************!*\
  !*** external "regenerator-runtime" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("regenerator-runtime");;

/***/ }),

/***/ "swagger-ui-express":
/*!*************************************!*\
  !*** external "swagger-ui-express" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("swagger-ui-express");;

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("winston");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/server.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
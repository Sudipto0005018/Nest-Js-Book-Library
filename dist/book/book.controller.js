"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const book_service_1 = require("./book.service");
const create_book_dto_1 = require("./dto/create-book.dto");
const update_book_dto_1 = require("./dto/update-book.dto");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const role_enum_1 = require("../auth/enums/role.enum");
const roles_guard_1 = require("../auth/guards/roles.guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let BookController = class BookController {
    bookservice;
    constructor(bookservice) {
        this.bookservice = bookservice;
    }
    async getAllBooks(query) {
        return this.bookservice.findAll(query);
    }
    async createBook(book, req) {
        console.log(req.user);
        return this.bookservice.create(book, req.user);
    }
    async getBook(id) {
        return this.bookservice.findById(id);
    }
    async updateBook(id, book) {
        return this.bookservice.updateById(id, book);
    }
    async deleteBook(id) {
        return this.bookservice.deleteById(id);
    }
    async uploadImages(id, files) {
        const images = files.map((file) => ({
            filename: file.filename,
            path: file.path,
            mimetype: file.mimetype,
            size: file.size,
        }));
        const updatedBook = await this.bookservice.addImages(id, images);
        return {
            message: 'Files uploaded and saved in DB successfully',
            book: updatedBook,
        };
    }
};
exports.BookController = BookController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Moderator, role_enum_1.Role.Admin),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getAllBooks", null);
__decorate([
    (0, common_1.Post)('new'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "createBook", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getBook", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_book_dto_1.UpdateBookDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "updateBook", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "deleteBook", null);
__decorate([
    (0, common_1.Put)('upload/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 5, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${uniqueSuffix}-${file.originalname}`);
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|avif|webp)$/)) {
                return cb(new common_1.BadRequestException('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "uploadImages", null);
exports.BookController = BookController = __decorate([
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
//# sourceMappingURL=book.controller.js.map
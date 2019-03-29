import {Router} from 'express';

// Extensible router to create resource router
class ApiRouter {

    public router: Router;
    public resourceController: any;
    public resourceMiddleware: any = {};
    public excepts: string[];

    constructor() {
        this.router = Router();
        this.excepts = [];
    }

    resource(controller) {
        this.resourceController = controller;
        return this;
    }

    middleware(middleware) {
        this.resourceMiddleware = middleware;
        return this;
    }

    except(excepts) {
        this.excepts = excepts;
        return this;
    }

    executeResource() {
        if (this.excepts.indexOf("show") < 0 && typeof this.resourceController.show === "function") {
            this.router.get(
                "/:id",
                this.resourceMiddleware.show ? this.resourceMiddleware.show : [],
                this.resourceController.show
            );
        }
        if (this.excepts.indexOf("index") < 0 && typeof this.resourceController.index === "function") {
            this.router.get(
                "",
                this.resourceMiddleware.index ? this.resourceMiddleware.index : [],
                this.resourceController.index
            );
        }
        if (this.excepts.indexOf("store") < 0 && typeof this.resourceController.store === "function") {
            this.router.post(
                "",
                this.resourceMiddleware.store ? this.resourceMiddleware.store : [],
                this.resourceController.store
            );
        }
        if (this.excepts.indexOf("update") < 0 && typeof this.resourceController.update === "function") {
            ["PUT", "PATCH"].forEach((method) => {
                this.router[method](
                    "/:id",
                    this.resourceMiddleware.update ? this.resourceMiddleware.update : [],
                    this.resourceController.update
                );
            })
        }
        if (this.excepts.indexOf("destroy") < 0 && typeof this.resourceController.destory === "function") {
            this.router.delete(
                "/:id",
                this.resourceMiddleware.destroy ? this.resourceMiddleware.destroy : [],
                this.resourceController.destroy
            );
        }
    }

}


export default ApiRouter;

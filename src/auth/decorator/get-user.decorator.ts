import { createParamDecorator, ExecutionContext } from "@nestjs/common";


// this will create us a cunstom decorator to use it instead of manual @Req() for user.
// it gets data and request execution context.
export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request: Express.Request =  ctx
            .switchToHttp()
            .getRequest();
        
        if(data){
            return request.user[data];
        }
        return request.user;
    },
);
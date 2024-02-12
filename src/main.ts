import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: process.env.FE_URL,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            // return bad request if there are unknown key in json dto https://github.com/typestack/class-validator/issues/305
            whitelist: true,
            forbidNonWhitelisted: true,
            forbidUnknownValues: true,
        })
    );
    await app.listen(3000);
}
bootstrap();

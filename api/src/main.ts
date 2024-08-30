import { NestFactory } from "@nestjs/core";
import { PokedexApiModule } from "./pokedex-api.module";

async function bootstrap() {
  const app = await NestFactory.create(PokedexApiModule);
  app.setGlobalPrefix("api");
  app.enableCors({
    origin: ["http://localhost:4200"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
  });
  await app.listen(3000);
}

bootstrap();

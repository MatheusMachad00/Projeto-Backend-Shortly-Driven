CREATE TABLE "public.users" (
	"id" serial NOT NULL,
	"name" varchar(150) NOT NULL,
	"email" varchar(100) NOT NULL UNIQUE,
	"password" varchar(30) NOT NULL UNIQUE,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.tokens" (
	"id" serial NOT NULL,
	"userId" int NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	CONSTRAINT "tokens_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.url" (
	"id" serial NOT NULL,
	"userId" int NOT NULL,
	"url" TEXT NOT NULL,
	"shortUrl" TEXT NOT NULL,
	"visitCount" int NOT NULL,
	CONSTRAINT "url_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "tokens" ADD CONSTRAINT "tokens_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "url" ADD CONSTRAINT "url_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
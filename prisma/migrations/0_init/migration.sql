-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "seats" INTEGER NOT NULL,
    "scheme" VARCHAR(255) NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "emoji" VARCHAR(255) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drivers" (
    "id" SERIAL NOT NULL,
    "chat_id" BIGINT NOT NULL,
    "name" VARCHAR(255),
    "registration_number" VARCHAR(255),
    "phone" VARCHAR(255),

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "local-orders" (
    "id" SERIAL NOT NULL,
    "client" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "pickup_location" VARCHAR(255) NOT NULL,
    "direction_location" VARCHAR(255),
    "driver" INTEGER,
    "comment" VARCHAR(255),
    "phone" VARCHAR(255),
    "price" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "local-orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "user" INTEGER NOT NULL,
    "ride_id" INTEGER NOT NULL,
    "seat" INTEGER NOT NULL,
    "comment" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rides" (
    "id" SERIAL NOT NULL,
    "route_id" INTEGER NOT NULL,
    "car_id" INTEGER,
    "seats_id" INTEGER,
    "price" INTEGER,
    "time" VARCHAR(255) NOT NULL,
    "date" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "rides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routes" (
    "id" SERIAL NOT NULL,
    "departure_city" VARCHAR(255) NOT NULL,
    "arrival_city" VARCHAR(255) NOT NULL,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seats" (
    "id" SERIAL NOT NULL,
    "ride_id" INTEGER NOT NULL,
    "car_id" INTEGER NOT NULL,
    "seats" INTEGER[],

    CONSTRAINT "seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxi_routes" (
    "id" SERIAL NOT NULL,
    "departure_city" VARCHAR(255) NOT NULL,
    "target_city" VARCHAR(255) NOT NULL,
    "area" VARCHAR(255) NOT NULL,
    "departure_time" TIMESTAMPTZ(6),
    "arrival_time" TIMESTAMPTZ(6),

    CONSTRAINT "taxi_routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "chat_id" BIGINT NOT NULL,
    "favorite_city" VARCHAR(255),
    "phone" VARCHAR(255),
    "dialogue_status" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "drivers_chat_id_key" ON "drivers"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_chat_id_key" ON "users"("chat_id");


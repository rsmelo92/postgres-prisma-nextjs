seed: 
	\
	POSTGRES_URL=postgres://default:v9C6laFqINds@ep-wispy-night-a4z9bxzx-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require \
	POSTGRES_URL_NON_POOLING=postgres://default:v9C6laFqINds@ep-wispy-night-a4z9bxzx.us-east-1.aws.neon.tech/verceldb?sslmode=require \
	POSTGRES_USER=default \
	POSTGRES_HOST=ep-wispy-night-a4z9bxzx-pooler.us-east-1.aws.neon.tech \
	POSTGRES_PASSWORD=v9C6laFqINds \
	POSTGRES_DATABASE=verceldb \
	POSTGRES_PRISMA_URL=postgres://default:v9C6laFqINds@ep-wispy-night-a4z9bxzx-pooler.us-east-1.aws.neon.tech/verceldb?pgbouncer=true\&connect_timeout=15\&sslmode=require pnpm prisma db seed

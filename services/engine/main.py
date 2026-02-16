import asyncio
from core.logging.logger import logger
from services.engine.pipelines.options_pipeline import run_options_pipeline
from services.engine.pipelines.forex_pipeline import run_forex_pipeline
from services.engine.writers.redis_writer import write_state_batch

LOOP_SECONDS = 15  # frecuencia del engine

async def engine_loop():
    logger.info("Starting MarketAIPros institutional engine loop...")

    while True:
        try:
            # 1) Ejecutar pipeline de opciones
            options_state = await run_options_pipeline()

            # 2) Ejecutar pipeline de forex
            forex_state = await run_forex_pipeline()

            # 3) Escribir estado en Redis (batch)
            state_batch = {
                "options": options_state,
                "forex": forex_state,
            }
            await write_state_batch(state_batch)

            logger.info("Engine cycle completed successfully.")

        except Exception as e:
            logger.error(f"Engine cycle failed: {e}")

        await asyncio.sleep(LOOP_SECONDS)

if __name__ == "__main__":
    asyncio.run(engine_loop())

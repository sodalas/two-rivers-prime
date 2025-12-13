import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
export const sdk = new NodeSDK({
    traceExporter: new ConsoleSpanExporter(),
    instrumentations: [
        getNodeAutoInstrumentations({
            // Explicitly disable everything except HTTP/Express as per directive
            '@opentelemetry/instrumentation-fs': { enabled: false },
            '@opentelemetry/instrumentation-dns': { enabled: false },
            '@opentelemetry/instrumentation-net': { enabled: false },
            '@opentelemetry/instrumentation-http': { enabled: true },
            '@opentelemetry/instrumentation-express': { enabled: true },
            // Disable others to be safe
            '@opentelemetry/instrumentation-grpc': { enabled: false },
            '@opentelemetry/instrumentation-mysql': { enabled: false },
            '@opentelemetry/instrumentation-pg': { enabled: false },
            '@opentelemetry/instrumentation-redis': { enabled: false }, // Explicitly disabled for now to reduce noise
        }),
    ],
});
export async function startTelemetry() {
    try {
        await sdk.start();
        console.info('Telemetry SDK started successfully.');
    }
    catch (error) {
        console.warn('Telemetry SDK failed to start, continuing without observability.', error);
        // Non-fatal as per "Telemetry initialization must be non-fatal"
    }
}
export async function stopTelemetry() {
    try {
        await sdk.shutdown();
        console.info('Telemetry SDK shut down successfully.');
    }
    catch (error) {
        console.error('Error shutting down Telemetry SDK', error);
    }
}

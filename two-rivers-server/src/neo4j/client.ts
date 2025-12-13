import neo4j, { Driver } from 'neo4j-driver';
import { ENV } from '../env.js';

let driver: Driver | null = null;
let isConnected = false;

export async function connectNeo4j() {
  try {
    driver = neo4j.driver(
      ENV.NEO4J_URI!,
      neo4j.auth.basic(ENV.NEO4J_USERNAME!, ENV.NEO4J_PASSWORD!)
    );

    // Verify connectivity once at startup as per Guardrail A
    await driver.verifyConnectivity();
    
    console.info('Neo4j Driver Connected and Verified');
    isConnected = true;
  } catch (error) {
    console.error('FATAL: Failed to connect to Neo4j at startup.', error);
    if (driver) {
      await driver.close();
    }
    process.exit(1);
  }
}

export async function disconnectNeo4j() {
  if (driver) {
    console.info('Closing Neo4j Driver...');
    await driver.close();
    driver = null;
    isConnected = false;
    console.info('Neo4j Driver Closed');
  }
}

export function getNeo4jDriver(): Driver {
  if (!driver) {
    throw new Error('Neo4j driver not initialized. Call connectNeo4j() first.');
  }
  return driver;
}

export function isNeo4jConnected() {
  return isConnected;
}


export const logErrorResponse = (errorData: unknown, routeContext?: string) => {
  const timestamp = new Date().toISOString();
  
  const contextPrefix = routeContext ? `[${routeContext}] ` : '';

  console.error(`\n🔴 --- ERROR LOG STARTED AT ${timestamp} ---`);

  if (errorData instanceof Error) {
    console.error(`${contextPrefix}${errorData.name}: ${errorData.message}`);
    if (errorData.stack) {
      console.error(`Stack trace:\n${errorData.stack}`);
    }
  } else if (typeof errorData === 'object' && errorData !== null) {
 
    try {
      const stringifiedData = JSON.stringify(errorData, null, 2);
      console.error(`${contextPrefix}Payload:\n${stringifiedData}`);
    } catch {
      console.error(`${contextPrefix}Unserializable object received.`);
    }
  } else if (typeof errorData === 'string') {
    
    console.error(`${contextPrefix}${errorData}`);
  } else {
    console.error(`${contextPrefix}Unknown error format:`, String(errorData));
  }

  console.error(`--------------------------------------------------\n`);

  // TODO: 
  // if (process.env.NODE_ENV === 'production') {
  //   Sentry.captureException(errorData);
  // }
};
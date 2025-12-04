import type { ProcessorRegistration, ScheduledTaskConfig } from "./config";

// Uncomment the following lines to see the examples of scheduled tasks and asynchronous tasks
// import { demoScheduledTasks, demoTaskProcessors } from "./examples/demo-tasks";

// ============ task registrations ============

/**
 *
 * @example
 * ```typescript
 * import { sendEmailProcessor } from "./processors/email.processor";
 *
 * const customTaskProcessors: ProcessorRegistration[] = [
 *   { name: "send-email", processor: sendEmailProcessor },
 * ];
 * ```
 */
const customTaskProcessors: ProcessorRegistration[] = [];

export const taskProcessors: ProcessorRegistration[] = [
  // ...demoTaskProcessors,
  ...customTaskProcessors,
];

// ============ scheduled task registrations ============

/**
 *
 * @example
 * ```typescript
 * const customScheduledTasks: ScheduledTaskConfig[] = [
 *   {
 *     name: "system-health-check",
 *     pattern: "0 * * * *",
 *     data: {},
 *   },
 * ];
 * ```
 */
const customScheduledTasks: ScheduledTaskConfig[] = [];

export const allScheduledTasks: ScheduledTaskConfig[] = [
  // ...demoScheduledTasks,
  ...customScheduledTasks,
];

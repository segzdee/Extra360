import { MicroserviceType } from '../types/architecture';

export interface ScalingConfiguration {
  serviceType: MicroserviceType;
  maxInstances: number;
  minInstances: number;
  cpuThreshold: number;
  memoryThreshold: number;
  requestRateThreshold: number;
}

export interface LoadBalancingStrategy {
  type: 'round_robin' | 'least_connections' | 'weighted';
  configuration: Record<string, any>;
}

export class ScalingManager {
  private configurations: Map<MicroserviceType, ScalingConfiguration> = new Map();

  registerScalingConfig(config: ScalingConfiguration) {
    this.configurations.set(config.serviceType, config);
  }

  getScalingConfig(serviceType: MicroserviceType): ScalingConfiguration | undefined {
    return this.configurations.get(serviceType);
  }

  // Additional scaling logic methods can be added here
}

export const scalingManager = new ScalingManager();

export interface DependencyResolver {
  register<T>(token: symbol, implementation: T): void;
  resolve<T>(token: symbol): T;
  clear(): void;
}

export class TypeSafeDependencyContainer implements DependencyResolver {
  private dependencies: Map<symbol, any> = new Map();

  register<T>(token: symbol, implementation: T): void {
    if (this.dependencies.has(token)) {
      throw new Error(`Dependency with token ${token.toString()} already exists`);
    }
    this.dependencies.set(token, implementation);
  }

  resolve<T>(token: symbol): T {
    const dependency = this.dependencies.get(token);
    if (!dependency) {
      throw new Error(`No dependency found for token ${token.toString()}`);
    }
    return dependency;
  }

  clear(): void {
    this.dependencies.clear();
  }
}

// Example Usage
export const dependencyContainer = new TypeSafeDependencyContainer();

import {
  CommonConfiguration,
  ConfigurationDefaultEnv,
  createConfiguration,
} from ".";
import { ApiService } from "api";
import { AttesterService } from "topics/attester";
import { BadgeService } from "topics/badge";
import { DataProviderInterfaceService } from "topics/data-provider-interfaces";
import { FlowService } from "topics/flow";
import { GroupGeneratorService } from "topics/group-generator";

export class ServiceFactory {
  configuration: CommonConfiguration;

  constructor(configuration: CommonConfiguration) {
    this.configuration = configuration;
  }

  public getApiService(log?: boolean, staticPrefix?: string): ApiService {
    return new ApiService({
      attesterService: this.getAttesterService(),
      badgeService: this.getBadgeService(),
      dataProviderInterfaceService: this.getDataProviderInterfaceService(),
      flowService: this.getFlowService(),
      groupGeneratorService: this.getGroupGeneratorsService(),
      availableDataStore: this.configuration.availableDataStore,
      availableGroupStore: this.configuration.availableGroupStore,
      groupStore: this.configuration.groupStore,
      groupGeneratorStore: this.configuration.groupGeneratorStore,
      log: log,
      staticPrefix: staticPrefix,
      logger: this.configuration.logger,
    });
  }

  public getAttesterService(): AttesterService {
    return new AttesterService({
      attesters: this.configuration.attesters,
      availableDataStore: this.configuration.availableDataStore,
      availableGroupStore: this.configuration.availableGroupStore,
      groupStore: this.configuration.groupStore,
      logger: this.configuration.logger,
      networks: this.configuration.envNetworks,
    });
  }

  public getBadgeService(): BadgeService {
    return new BadgeService(
      this.configuration.badgesCollections,
      this.configuration.envNetworks
    );
  }

  public getDataProviderInterfaceService(): DataProviderInterfaceService {
    return new DataProviderInterfaceService(
      this.configuration.dataProviderInterfaces
    );
  }

  public getFlowService(): FlowService {
    return new FlowService(
      this.configuration.flows,
      this.configuration.envNetworks
    );
  }

  public getGroupGeneratorsService(): GroupGeneratorService {
    return new GroupGeneratorService({
      groupGenerators: this.configuration.groupGenerators,
      groupStore: this.configuration.groupStore,
      groupGeneratorStore: this.configuration.groupGeneratorStore,
      globalResolver: this.configuration.globalResolver,
      logger: this.configuration.logger,
    });
  }

  public static withDefault(
    type: ConfigurationDefaultEnv,
    configuration: Partial<CommonConfiguration>
  ): ServiceFactory {
    return new ServiceFactory(createConfiguration(type, configuration));
  }
}

import {
  formatFiles,
  NxJsonConfiguration,
  readNxJson,
  readProjectConfiguration,
  Tree,
  updateJson,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { NxSonarqubeGeneratorSchema } from './schema';

export default async function (
  tree: Tree,
  options: NxSonarqubeGeneratorSchema
) {
  updateGitIgnore(tree);
  if (!options.skipTargetDefaults) {
    updateTargetDefaults(tree);
  }
  updateProjectConfig(tree, options);
  await formatFiles(tree);
}

function updateGitIgnore(tree: Tree): void {
  const ignoreFile = '.gitignore';

  if (tree.exists(ignoreFile)) {
    let gitIgnore = tree.read('.gitignore').toString('utf-8');
    if (!gitIgnore.includes('.scannerwork')) {
      gitIgnore += '\n.scannerwork';
      tree.write(ignoreFile, gitIgnore);
    }
  }
}

function updateTargetDefaults(tree: Tree): void {
  const nxJsonConfiguration = readNxJson();
  const hasSonar = Object.keys(nxJsonConfiguration.targetDefaults).find(
    (key) => key === 'sonar'
  );

  if (!hasSonar) {
    updateJson<NxJsonConfiguration>(tree, 'nx.json', (json) => {
      json.targetDefaults.sonar = {
        dependsOn: ['^test', 'test'],
      };
      return json;
    });
  }
}

function updateProjectConfig(
  tree: Tree,
  options: NxSonarqubeGeneratorSchema
): void {
  const projectConfiguration = readProjectConfiguration(tree, options.name);

  if (projectConfiguration.targets.sonar) {
    throw new Error(
      `Project "${options.name}" already has a "sonar" target configured`
    );
  } else {
    projectConfiguration.targets.sonar = {
      executor: '@koliveira15/nx-sonarqube:scan',
      options: {
        hostUrl: options.hostUrl,
        projectKey: options.projectKey,
      },
    };
    updateProjectConfiguration(tree, options.name, projectConfiguration);
  }
}

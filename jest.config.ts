import { getJestProjectsAsync } from '@nx/jest';

export default async () => ({
  projects: await getJestProjectsAsync(),
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
});

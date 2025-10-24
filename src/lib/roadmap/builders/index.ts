import { mrcpBuilder } from './mrcpBuilder';
import { defaultBuilder } from './defaultBuilder';
import { RoadmapBuilder, BuildParams, Roadmap } from '../types';

// All builders use the same pattern - for now, we'll use default for most
// Each can be customized later with specific exam blocks
const builders: Record<string, RoadmapBuilder> = {
  mrcpBuilder,
  mrcsBuilder: defaultBuilder,
  frcsBuilder: defaultBuilder,
  frcaBuilder: defaultBuilder,
  frcrBuilder: defaultBuilder,
  frcpathBuilder: defaultBuilder,
  frcophthBuilder: defaultBuilder,
  mrcpsychBuilder: defaultBuilder,
  mrcpchBuilder: defaultBuilder,
  mrcogBuilder: defaultBuilder,
  mrcgpBuilder: defaultBuilder,
  mrcemBuilder: defaultBuilder,
  frcemBuilder: defaultBuilder,
  facultiesBuilder: defaultBuilder,
  diplomaBuilder: defaultBuilder,
  defaultBuilder
};

export function buildRoadmap(builderId: string, params: BuildParams): Roadmap {
  const builder = builders[builderId] || builders.defaultBuilder;
  return builder(params);
}

export { mrcpBuilder, defaultBuilder };

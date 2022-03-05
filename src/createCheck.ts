/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type { GitHub } from "@actions/github/lib/utils";

// create a check and return a function that updates (completes) it
type Repo = {
  owner: string;
  repo: string;
};
export async function createCheck(
  github: InstanceType<typeof GitHub>,
  repo: Repo,
  sha: string
) {
  const check = await github.checks.create({
    ...repo,
    name: "Deploy Preview",
    head_sha: sha,
    //    head_sha: context.payload.pull_request?.head.sha,
    status: "in_progress",
  });

  return async (details: Object) => {
    await github.checks.update({
      ...repo,
      check_run_id: check.data.id,
      completed_at: new Date().toISOString(),
      status: "completed",
      ...details,
    });
  };
}

/** *******************************************************************************************************************
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License").
  You may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 ******************************************************************************************************************** */

import { DataExchangeFormat } from '../../../../../customTypes';
import escapeMarkdown from '../../../../../utils/escapeMarkdown';
import parseTableCellContent from '../../../../../utils/parseTableCellContent';
import standardizeNumericId from '../../../../../utils/standardizeNumericId';

export const getControlsContent = async (
  data: DataExchangeFormat,
) => {
  const rows: string[] = [];
  rows.push('## Security Controls');

  rows.push('\n');

  rows.push('| Control Number | Control | Threats Mitigating | Mitigations | Comments |');
  rows.push('| --- | --- | --- | --- | --- |');

  if (data.controls) {
    const promises = data.controls.map(async (x) => {
      const threats = data.controlLinks?.filter(cl => cl.controlId === x.id) || [];
      const mitigationLinks = data.mitigationLinks?.filter(ml => ml.linkedId === x.id) || [];

      const threatsContent = threats.map(tl => {
        const threat = data.threats?.find(s => s.id === tl.linkedId);
        if (threat) {
          const threatId = `T-${standardizeNumericId(threat.numericId)}`;
          return `[**${threatId}**](#${threatId}): ${escapeMarkdown(threat.statement || '')}`;
        }
        return null;
      }).filter(t => !!t).join('<br/>');

      const mitigationsContent = mitigationLinks.map(ml => {
        const mitigation = data.mitigations?.find(m => m.id === ml.mitigationId);
        if (mitigation) {
          const mitigationId = `A-${standardizeNumericId(mitigation.numericId)}`;
          return `[**${mitigationId}**](#${mitigationId}): ${escapeMarkdown(mitigation.content)}`;
        }
        return null;
      }).filter(m => !!m).join('<br/>');

      const comments = await parseTableCellContent((x.metadata?.find(m => m.key === 'Comments')?.value as string) || '');

      const controlId = `C-${standardizeNumericId(x.numericId)}`;
      return `| ${controlId} | ${escapeMarkdown(x.content)} | ${threatsContent} | ${mitigationsContent} | ${escapeMarkdown(comments)} |`;
    });

    rows.push(...(await Promise.all(promises)));
  }

  rows.push('\n');

  return rows.join('\n');
};
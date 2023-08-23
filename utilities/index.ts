import type { IconSet } from '@iconify/tools';
import {
  deOptimisePaths,
  importDirectory,
  parseColors,
  runSVGO,
  cleanupSVG
} from '@iconify/tools';
import type { CustomIconLoader } from '@iconify/utils/lib/loader/types';
/**
 * Load custom icon set
 */
function loadCustomIconSet(): CustomIconLoader {
  const promise = new Promise<IconSet>((resolve, reject) => {
    importDirectory('assets/svg', {
      prefix: 'svg',
    }).then((iconSet) => {
      iconSet
      .forEach(async (name: any) => {
        const svg = iconSet.toSVG(name)!;
        cleanupSVG(svg);
        await parseColors(svg, {
          defaultColor: 'currentColor',
          callback: (attr, colorStr, color: any) => {
            if (color)  return 'currentColor';

            switch (color?.type) {
              case 'none':
              case 'current':
                return color;
            }

            throw new Error(
                `Unexpected color "${colorStr}" in attribute ${attr}`
            );
          },
        });

        // Optimise
        runSVGO(svg);

        // Update paths for compatibility with old software
        await deOptimisePaths(svg);

        // Update icon in icon set
        iconSet.fromSVG(name, svg);
      })
      .then(() => {
        resolve(iconSet);
      })
      .catch((err) => {
        reject(err);
      });
    });
  });

  return async (name) => {
    const iconSet = await promise;
    return iconSet.toSVG(name)?.toMinifiedString();
  };
}

export {
  loadCustomIconSet
};

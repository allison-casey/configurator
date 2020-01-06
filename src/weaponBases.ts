export namespace Bases {
  const cfgWeaponsBaseClasses = `
class Default;
class Rifle_Base_F;
class Rifle_Short_Base_F: Rifle_Base_F {};
class Rifle_Long_Base_F: Rifle_Base_F {};
class PistolCore;
class Pistol: PistolCore
{
    opticsZoomMin=0.5;
    opticsZoomMax=0.5;
    opticsZoomInit=0.5;
};
class Pistol_Base_F: Pistol
{
    class WeaponSlotsInfo;
    opticsZoomMin=0.5;
    opticsZoomMax=0.5;
    opticsZoomInit=0.5;
};
class ItemCore;
class InventoryOpticsItem_Base_F;
class LauncherCore;
class Launcher: LauncherCore
{
    opticsZoomMin=0.5; // Zoomed-in value as a fraction of full FOV (i.e. smaller = more zoom). 0.75 = normal, 1 = slight fisheye, 0.5 = slight zoom
    opticsZoomMax=0.5; // Zoomed-out value
    opticsZoomInit=0.5; // Starting value
};
class Launcher_Base_F: Launcher {};
class GrenadeLauncher: Default
{
    opticsZoomMin=0.5;
    opticsZoomMax=0.5;
    opticsZoomInit=0.5;
};
class UGL_F: GrenadeLauncher
{
    opticsZoomMin=0.5;
    opticsZoomMax=0.5;
    opticsZoomInit=0.5;
};
class RifleCore;
class Rifle: RifleCore
{
    opticsZoomMin=0.5;
    opticsZoomMax=0.5;
    opticsZoomInit=0.5;
};
class Put: Default
{
    class PutMuzzle: Default
    {
        opticsZoomMin=0.5;
        opticsZoomMax=0.5;
        opticsZoomInit=0.5;
    };
};`.split("\n");

  const parseCfgWeaponsBases = (classes: string[]): {undefinedBases: string[]; definedClasses: string[]} => {
    const re = /^class (\w+)\s*?(?::\s+(\w+))?/;

    const out = classes.reduce(
      (accum, curr) => {
        let match = re.exec(curr);
        if (match) {
          const [, classname, base] = match
          const definedClasses = [...accum.definedClasses, ...(classname ? [classname] : [])]
          const undefinedBases = definedClasses.indexOf(base) === -1 ? [...accum.undefinedBases, ...(base ? [base] : [])] : accum.undefinedBases

          return {undefinedBases, definedClasses}
        } else return accum
      },
      { undefinedBases: [], definedClasses: [] }
    );

    return out
  };


  export const parsedCfgWeaponsBases = {...parseCfgWeaponsBases(cfgWeaponsBaseClasses), classes: cfgWeaponsBaseClasses}
}

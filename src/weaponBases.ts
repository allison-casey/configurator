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
};
//SMA Base
class mk20_base_F: Rifle_Base_F {
    class Single: Mode_SemiAuto {};
    class FullAuto: Mode_FullAuto {};
};
class SMA_AssaultBase: mk20_base_f {};
class SMA_556_RIFLEBASE: SMA_AssaultBase
{
        class Single;
        class FullAuto;
};
class SMA_762_RIFLEBASE: SMA_AssaultBase
{
        class Single;
        class FullAuto;
};

// Vanilla
class pdw2000_base_F: Rifle_Short_Base_F {
    class Single: Mode_SemiAuto {};
    class Burst: Mode_Burst {};
    class FullAuto: Mode_FullAuto {};
};
class SMG_01_Base: Rifle_Short_Base_F {
    class Single: Mode_SemiAuto {};
    class Burst: Mode_Burst {};
    class FullAuto: Mode_FullAuto {};                
};
class SMG_02_base_F: Rifle_Short_Base_F {
    class Single: Mode_SemiAuto {};
    class Burst: Mode_Burst {};
    class FullAuto: Mode_FullAuto {};
};
class arifle_Katiba_Base_F: Rifle_Base_F {
    class Single: Mode_SemiAuto {};
    class FullAuto: Mode_FullAuto {};
};
class arifle_MX_Base_F: Rifle_Base_F {
    class Single: Mode_SemiAuto {};
    class FullAuto: Mode_FullAuto {};
};
class SDAR_base_F: Rifle_Base_F {
    class Single: Mode_SemiAuto {};
    class Burst: Mode_Burst {};
    class FullAuto: Mode_FullAuto {};
};
class Tavor_base_F: Rifle_Base_F {
    class Single: Mode_SemiAuto {};
    class Burst: Mode_Burst {};
    class FullAuto: Mode_FullAuto {};
};
class DMR_01_base_F: Rifle_Long_Base_F {
    class Single: Mode_SemiAuto {};
    class FullAuto: Mode_FullAuto {};
};
class EBR_base_F: Rifle_Long_Base_F {
    class Single: Mode_SemiAuto {};
    class FullAuto: Mode_FullAuto {};
};
class GM6_base_F: Rifle_Long_Base_F {
    class Single: Mode_SemiAuto {};
};
class LRR_base_F: Rifle_Long_Base_F {
    class Single: Mode_SemiAuto {};
};

//SMA        
class SMA_A3_BASE_F: SMA_556_RIFLEBASE
{
        class Single: Single {};        
        class FullAuto: FullAuto {};
};        
class SMA_AAC_MPW_BASE: SMA_556_RIFLEBASE
{
        class Single: Single {};        
        class FullAuto: FullAuto {};
};
class SMA_AAC_MPW_WDL_BASE: SMA_AAC_MPW_BASE {};
class SMA_AAC_MPW_DES_BASE: SMA_AAC_MPW_BASE {};
class SMA_ACR_BASE: SMA_556_RIFLEBASE        
{
        class Single: Single {};        
        class FullAuto: FullAuto {};
};
class SMA_ACRREM_BASE: SMA_556_RIFLEBASE
{
        class Single: Single {};        
        class FullAuto: FullAuto {};
};
class SMA_HK416_BASE: SMA_556_RIFLEBASE        
{
        class Single: Single {};        
        class FullAuto: FullAuto {};
};
class SMA_M4_BASE: SMA_556_RIFLEBASE
{
        class Single: Single {};        
        class FullAuto: FullAuto {};
};
class sma_minimi_762_base_F: Rifle_Long_Base_F
{
        class FullAuto: Mode_FullAuto {};
};        
class SMA_MK18_BASE: SMA_556_RIFLEBASE
{
        class Single: Single {};        
        class FullAuto: FullAuto {};
};
class SMA_SAR21_BASE_F: SMA_556_RIFLEBASE        
{
        class Single: Single {};        
        class FullAuto: FullAuto {};
};
class SMA_SKS_BASE_F: SMA_762_RIFLEBASE
{
        class Single: Single {};        
};
class SMA_Steyr_AUG_BASE_F: SMA_556_RIFLEBASE
{
        class Single: Single {};        
        class FullAuto: FullAuto {};
};
class SMA_STG_BASE_F: SMA_556_RIFLEBASE        
{
        class Single: Single {};        
        class FullAuto: FullAuto {};
};
class SMA_Tavor_BASE_F: SMA_556_RIFLEBASE        
{
        class Single: Single {};        
        class FullAuto: FullAuto {};
};
class SMA_CTar_BASE_F: SMA_556_RIFLEBASE        
{
        class Single: Single {};        
        class FullAuto: FullAuto {};
};
`.split("\n");

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

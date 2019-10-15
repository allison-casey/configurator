import { Utils } from "../utils";

interface VehicleFOV {
  classnameBase: string;
  minFOV: string;
  initFOV: string;
  maxFOV: string;
}

interface ArmorValues {
  armor: string;
  passThrough: string;
  minimalHit: string;
  explosionShielding: string;
}

interface VehicleBody {
  armor?: string;
  armorStructural?: string;
  armorLights?: string;
  crewExplosionProtection?: string;
  damageResistance?: string;
  wheelDamageThreshold?: string;
}

interface VehicleArmor {
  classname: string;
  base: string;
  displayName?: string;
  driverZoom?: VehicleFOV;
  driverOpticZoom?: VehicleFOV;
  properties: VehicleBody;
  hull?: ArmorValues;
  engine?: ArmorValues;
  fuel?: ArmorValues;
  tracksWheels?: ArmorValues;
  slatsERA?: ArmorValues;
  turret?: ArmorValues;
  gun?: ArmorValues;
  comanderTurret?: ArmorValues;
  comanderGun?: ArmorValues;
}

export namespace Parsers {
  export const parseVehicleArmor = (rows: string[][]): string[] => {
    const toVehicleFOV = (start: number, row: string[]): VehicleFOV => ({
      classnameBase: row[start],
      minFOV: row[start + 1],
      initFOV: row[start + 2],
      maxFOV: row[start + 3]
    });

    const toArmorValues = (start: number, row: string[]): ArmorValues => ({
      armor: row[start],
      passThrough: row[start + 1],
      minimalHit: row[start + 2],
      explosionShielding: row[start + 3]
    });

    const toVehicleBody = (start: number, row: string[]): VehicleBody => ({
      ...(row[start] && { armor: row[start] }),
      ...(row[start + 1] && { armorStructural: row[start + 1] }),
      ...(row[start + 2] && { armorLights: row[start + 2] }),
      ...(row[start + 3] && { crewExplosionProtection: row[start + 3] }),
      ...(row[start + 4] && { damageResistance: row[start + 4] }),
      ...(row[start + 5] && { wheelDamageThreshold: row[start + 5] })
    });

    const toRecord = (row: string[]): VehicleArmor => ({
      classname: row[0],
      base: row[1],
      ...(row[4] && { driverZoom: toVehicleFOV(4, row) }),
      ...(row[9] && { driverOpticZoom: toVehicleFOV(9, row) }),
      properties: toVehicleBody(13, row),
      ...(row[19] && { hull: toArmorValues(19, row) }),
      ...(row[23] && { engine: toArmorValues(23, row) }),
      ...(row[27] && { fuel: toArmorValues(27, row) }),
      ...(row[32] && { tracksWheels: toArmorValues(32, row) }),
      ...(row[37] && { slatsERA: toArmorValues(37, row) }),
      ...(row[52] && { turret: toArmorValues(52, row) }),
      ...(row[56] && { gun: toArmorValues(56, row) }),
      ...(row[72] && { comanderTurret: toArmorValues(72, row) }),
      ...(row[76] && { comanderGun: toArmorValues(76, row) })
    });

    const parseRecord = (record: VehicleArmor): string[] => {
      const driverZoom: string[] = record.driverZoom
        ? Utils.renderClass(
            record.driverZoom.classnameBase,
            undefined,
            ...Utils.renderProperties(
              ["minFOV", "initFOV", "maxFOV"],
              record.driverZoom
            )
          )
        : [];

      const driverOpticZoom: string[] = record.driverOpticZoom
        ? Utils.renderClass(
            record.driverOpticZoom.classnameBase,
            undefined,
            ...Utils.renderProperties(
              ["minFOV", "initFOV", "maxFOV"],
              record.driverOpticZoom
            )
          )
        : [];

      const renderHitpoint = (
        classname: string,
        base: string,
        hitpoint: ArmorValues | undefined
      ): string[] =>
        hitpoint
          ? Utils.renderClass(
              classname,
              base,
              ...Utils.renderProperties(
                ["armor", "passThrough", "minimalHit", "explosionShielding"],
                hitpoint
              )
            )
          : [];

      const hitHull: string[] = renderHitpoint(
        "HitHull",
        "HitHull",
        record.hull
      );
      const hitEngine: string[] = renderHitpoint(
        "HitEngine",
        "HitEngine",
        record.engine
      );
      const hitFuel: string[] = renderHitpoint(
        "HitFuel",
        "HitFuel",
        record.fuel
      );

      const hitpoints: string[] = Utils.renderClass(
        "HitPoints",
        "HitPoints",
        ...hitHull,
        ...hitEngine,
        ...hitFuel
      );

      return Utils.renderClass(
        record.classname,
        record.base,
        ...Utils.renderProperties(
          [
            "armor",
            "armorStructural",
            "armorLights",
            "crewExplosionProtection",
            "damageResistance",
            "wheelDamageThreshold"
          ],
          record.properties
        ),
        ...driverZoom,
        ...driverOpticZoom,
        ...hitpoints
      );
    };

    const records: VehicleArmor[] = rows.map(toRecord);

    return records.reduce<string[]>(
      (accum: string[], curr: VehicleArmor, idx: number) =>
        idx % 2 === 0 ? accum : [...accum, ...parseRecord(curr)],
      []
    );
  };
}

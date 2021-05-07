export class EnumProps {
  public static joinEnum(
    enumName: Record<string, unknown>,
    seperator: string,
  ): string {
    return Object.keys(enumName).join(` ${seperator} `);
  }
}

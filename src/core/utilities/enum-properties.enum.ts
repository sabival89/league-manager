export class EnumProps {
  /**
   * Concatenate and print Enum properties
   * @param enumName Name of the enum
   * @param seperator Seperator of choice. The pipe (|) symbol is used by default
   * @returns
   */
  public static joinEnum(
    enumName: Record<string, unknown>,
    seperator?: string,
  ): string {
    return Object.keys(enumName).join(` ${seperator ?? '|'} `);
  }
}

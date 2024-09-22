import { LoggerMode } from '../root';
/**
 * The Logger class. Contains multiple functions to log data.
 */
export declare class Logger {
    /**
     * Split a str to make it fit into a given size.
     * @param str The str to crop.
     * @param max The max length limit.
     * @returns The cropped (or not) string.
     */
    private crop;
    /**
     * Returns the prefix for the logging.
     * @param mode The 'label' that describes the assets pack.
     * @param str The string to split to fit a given size.
     * @returns The prefix (str).
     */
    prefix(mode: string, str?: string): string;
    /**
     * Logs something in the console using the chosen assets.
     * @param mode The mode (assets pack).
     * @param args The data to print.
     * @returns Nothing.
     */
    log(mode: LoggerMode | string, ...args: unknown[]): void;
    /**
     * Logs something in the console using the clean assets.
     * @param mode The mode (assets pack).
     * @param args The data to print.
     * @returns Nothing.
     */
    clean(...args: unknown[]): void;
}

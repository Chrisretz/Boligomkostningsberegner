/**
 * Kunstig forsinkelse før beregningsresultat vises, så brugeren tydeligt
 * oplever feedback ved klik. ~0,8–1,0 s er et godt kompromis: under ~0,5 s
 * føles det ofte instant; over ~1,5 s begynder det at føles unødigt langsomt
 * uden reel netværksarbejde.
 */
export const CALCULATION_UI_DELAY_MS = 1000;

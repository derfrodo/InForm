export enum InFormPropertyMatcherTypes {
    UNKNOWN = "UNKNOWN",
    REGEX = "REGEX",
}

export interface InFormPropertyMatcher<TTYPE extends InFormPropertyMatcherTypes> {
    type: TTYPE;
}

export interface InFormPropertyMatcherRegexPattern<TPattern extends string>
    extends InFormPropertyMatcher<InFormPropertyMatcherTypes.REGEX> {
    pattern: TPattern;
}

export interface InFormPropertyMatcherRegexRegex<TTypeofRegex extends RegExp>
    extends InFormPropertyMatcher<InFormPropertyMatcherTypes.REGEX> {
    regex: TTypeofRegex;
}

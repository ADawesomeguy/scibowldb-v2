export enum QuestionType {
    TOSS_UP,
    BONUS,
}

export enum QuestionFormat {
    MULTIPLE_CHOICE,
    SHORT_ANSWER,
}

// todo: figure out custom topics
export enum QuestionCategory {
    ASTRONOMY,
    BIOLOGY,
    CHEMISTRY,
    COMPUTER_SCIENCE,
    EARTH_AND_SPACE,
    EARTH_SCIENCE,
    ENERGY,
    GENERAL_SCIENCE,
    MATH,
    PHYSICS,
    OTHER
}

export type Question = {
    type: QuestionType,
    format: QuestionFormat,
    category: QuestionCategory,
    question: String, // todo: maybe figure out how to do choices separately
    answer: String,
    tossUp: Question | null, // points to the corresponding toss-up or this
    bonus: Question | null, // points to the corresponding bonus or this
    submitter: String,
    source: String
};

export type TossUpQuestion = Question;

export type BonusQuestion = Question;
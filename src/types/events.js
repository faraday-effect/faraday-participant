// @flow

export type SemanticUIData = {
    name: string,
    value: string
};

export type ChangeEventHandler = (SyntheticEvent<>, SemanticUIData) => void;

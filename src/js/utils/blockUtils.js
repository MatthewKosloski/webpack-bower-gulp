import {SelectionState, Modifier} from 'draft-js';

const getBlockRange = (contentState, blockKey) => {
    const block = contentState.getBlockForKey(blockKey);

    return new SelectionState({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: block.getLength(),
        isBackward: false
    });
};

export function removeBlock(contentState, blockKey) {
    const blockRange = getBlockRange(contentState, blockKey);

    const contentWithResettedBlock = Modifier.setBlockType(
        contentState,
        blockRange,
        'unstyled'
    );

    return Modifier.removeRange(
        contentWithResettedBlock,
        blockRange,
        'backward'
    );
}
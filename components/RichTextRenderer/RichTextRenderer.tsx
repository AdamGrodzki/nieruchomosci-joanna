import React from 'react';
import { documentToReactComponents, Options} from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document, Node } from '@contentful/rich-text-types';
import styles from '@/components/RichTextRenderer/richTextRenderer.module.scss';

interface RichTextRendererProps {
    content: Document;
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
    const options: Options = {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (_node: Node, children: React.ReactNode) => {
                return <p className={styles.paragraph}>{children}</p>;
            },
            [BLOCKS.HEADING_1]: (_node: Node, children: React.ReactNode) => {
                return <h1 className={styles.heading1}>{children}</h1>;
            },
            [BLOCKS.HEADING_2]: (_node: Node, children: React.ReactNode) => {
                return <h2 className={styles.heading2}>{children}</h2>;
            },
            [BLOCKS.UL_LIST]: (_node: Node, children: React.ReactNode) => {
                return <ul className={styles.list}>{children}</ul>;
            },
            [BLOCKS.OL_LIST]: (_node: Node, children: React.ReactNode) => {
                return <ol className={styles.listItem}>{children}</ol>;
            },
            [BLOCKS.QUOTE]: (_node: Node, children: React.ReactNode) => {
                return <blockquote className={styles.quote}>{children}</blockquote>;
            },
        },
    };

    return (
        <div className={styles.richTextContent}>
            {documentToReactComponents(content, options)}
        </div>
    );
};

export default RichTextRenderer;
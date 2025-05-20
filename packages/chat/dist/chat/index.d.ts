export default function MastraChat({ agentId, getToken, onSubscribe, initialMessage, baseUrl }: {
    agentId: string;
    initialMessage?: string;
    baseUrl?: string;
    getToken?: () => Promise<string>;
    onSubscribe?: () => Promise<{
        message: string;
    } | void>;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map
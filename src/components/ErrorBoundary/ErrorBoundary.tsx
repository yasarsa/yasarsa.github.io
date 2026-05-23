import { Component } from "react";

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100dvh",
                    padding: "2rem",
                    fontFamily: "sans-serif",
                    textAlign: "center",
                }}>
                    <h1>Something went wrong</h1>
                    <p style={{ color: "#666", maxWidth: "500px" }}>
                        An unexpected error occurred. Try refreshing the page.
                    </p>
                    <pre style={{
                        background: "#f5f5f5",
                        padding: "1rem",
                        borderRadius: "8px",
                        maxWidth: "100%",
                        overflow: "auto",
                        fontSize: "0.85rem",
                    }}>
                        {this.state.error?.message}
                    </pre>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: "1rem",
                            padding: "0.75rem 1.5rem",
                            fontSize: "1rem",
                            cursor: "pointer",
                            borderRadius: "6px",
                            border: "none",
                            background: "#45a049",
                            color: "white",
                        }}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

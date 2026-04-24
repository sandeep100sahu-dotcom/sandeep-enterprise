import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div
          className="flex flex-col items-center justify-center min-h-[300px] gap-4 text-center p-8"
          data-ocid="error_boundary.error_state"
        >
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-destructive/10">
            <AlertTriangle className="w-7 h-7 text-destructive" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              Something went wrong
            </h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              {this.state.error?.message ??
                "An unexpected error occurred. Please try again."}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={this.handleReset}
            data-ocid="error_boundary.reload_button"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reload
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Inline error banner for sections
export function ErrorState({ message }: { message?: string }) {
  return (
    <div
      className="alert-red rounded-md p-4 flex items-center gap-3"
      data-ocid="error_state"
    >
      <AlertTriangle className="w-5 h-5 shrink-0" />
      <span className="text-sm">
        {message ?? "Failed to load data. Please try again."}
      </span>
    </div>
  );
}

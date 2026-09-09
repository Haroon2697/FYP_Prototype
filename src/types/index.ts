export type ProjectStatus = 'Completed' | 'Processing' | 'Failed';

export type AudienceType = 'New users' | 'Technical Evaluators' | 'Admins' | 'Power users';
export type VideoLengthOption = '30s' | '60s' | '90s' | '120s';
export type ScriptTone = 'friendly' | 'formal' | 'technical' | 'executive' | 'professional';

export interface GroundingDetail {
  targetElement: string;
  targetLabel: string;
  pageUrl: string;
  confidence: number;
  domSelector: string;
  stepId?: string;
  screenshotSnippet?: string;
}

export interface ScriptToken {
  text: string;
  isGrounded: boolean;
  groundingDetails?: GroundingDetail;
}

export interface ScriptSentence {
  id: string;
  timestamp: string;
  tokens: ScriptToken[];
  fullText: string;
}

export interface ScriptData {
  tone: ScriptTone;
  language: string;
  wordCount: number;
  estimatedDuration: string;
  approved: boolean;
  sentences: ScriptSentence[];
}

export interface WorkflowStep {
  id: string;
  stepNumber: number;
  action: string;
  targetElement: string;
  elementDescription: string;
  selectorType: 'CSS' | 'XPath' | 'data-testid';
  importance: string;
  timestamp: string;
  screenshotMockup: {
    pageTitle: string;
    route: string;
    wireframeType: 'dashboard' | 'form' | 'table' | 'modal' | 'settings';
    highlightBox: {
      top: number; // percentage
      left: number; // percentage
      width: number;
      height: number;
      label: string;
    };
  };
}

export interface Workflow {
  id: string;
  title: string;
  description: string;
  category: 'Onboarding' | 'Core Feature' | 'Admin & Settings' | 'Analytics & Reports' | 'Integration';
  explanatoryScore: number; // 0.0 to 1.0
  estimatedDuration: string;
  isPrimary: boolean;
  stepsCount: number;
  steps: WorkflowStep[];
}

export interface VideoScene {
  id: string;
  startTime: number; // seconds
  endTime: number;
  title: string;
  narration: string;
  workflowStepId?: string;
  sceneType: 'intro' | 'step' | 'feature' | 'outro';
  highlightLabel?: string;
}

export interface VideoData {
  title: string;
  aspectRatio: '16:9';
  resolution: string;
  durationSeconds: number;
  voiceoverModel: string;
  scenes: VideoScene[];
}

export interface ProjectTelemetry {
  domNodesExplored: number;
  routesCrawled: number;
  confidenceScore: number;
  durationSeconds: number;
  detectedTechStack: string[];
}

export interface Project {
  id: string;
  name: string;
  url: string;
  domain: string;
  tagline: string;
  status: ProjectStatus;
  createdAt: string;
  videoDuration: string;
  workflowsCount: number;
  targetAudience: AudienceType;
  focusAreas: string[];
  explanatoryScore: number;
  summary: string;
  telemetry: ProjectTelemetry;
  workflows: Workflow[];
  script: ScriptData;
  video: VideoData;
}

export interface CreateProjectPayload {
  url: string;
  name?: string;
  targetAudience: AudienceType;
  videoLength: VideoLengthOption;
  focusAreas: string[];
  tone: ScriptTone;
}

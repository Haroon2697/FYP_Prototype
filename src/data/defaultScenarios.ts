import scenariosJson from './demo-scenarios.json';
import { Project, CreateProjectPayload, Workflow } from '../types';

export const INITIAL_PROJECTS: Project[] = scenariosJson as unknown as Project[];

export function extractDomain(url: string): string {
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/\/.*$/, '') || 'saas-app.com';
  }
}

export function generateMockProjectFromUrl(payload: CreateProjectPayload): Project {
  const domain = extractDomain(payload.url);
  const brandName = payload.name || domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
  const id = `proj-${domain.replace(/[^a-z0-9]/gi, '-')}-${Date.now().toString(36)}`;

  const generatedWorkflows: Workflow[] = [
    {
      id: `wf-${id}-1`,
      title: `${payload.focusAreas[0] || 'Core Workflow'} → Primary Action → Confirmation`,
      description: `Autonomous discovery synthesized the high-conversion ${payload.focusAreas[0] || 'Core Action'} path for ${payload.targetAudience}.`,
      category: (payload.focusAreas[0] as Workflow['category']) || 'Core Feature',
      explanatoryScore: 0.94,
      estimatedDuration: payload.videoLength === '30s' ? '18s' : '32s',
      isPrimary: true,
      stepsCount: 3,
      steps: [
        {
          id: `step-${id}-1-1`,
          stepNumber: 1,
          action: `Click main call-to-action button on ${domain} home dashboard`,
          targetElement: `button[data-action="primary-start"]`,
          elementDescription: `High-visibility primary action button detected in hero container`,
          selectorType: 'data-testid',
          importance: 'Journey entry point',
          timestamp: '00:04',
          screenshotMockup: {
            pageTitle: `${brandName} / Console / Main`,
            route: `https://${domain}/app/start`,
            wireframeType: 'dashboard',
            highlightBox: {
              top: 15,
              left: 70,
              width: 22,
              height: 8,
              label: 'Button: Start Now'
            }
          }
        },
        {
          id: `step-${id}-1-2`,
          stepNumber: 2,
          action: `Configure parameters in the central configuration drawer`,
          targetElement: `input[name="workflow-param"]`,
          elementDescription: `Interactive parameter input field with real-time validation`,
          selectorType: 'CSS',
          importance: 'Core payload definition',
          timestamp: '00:14',
          screenshotMockup: {
            pageTitle: `${brandName} / Configuration Drawer`,
            route: `https://${domain}/app/setup`,
            wireframeType: 'modal',
            highlightBox: {
              top: 30,
              left: 30,
              width: 45,
              height: 10,
              label: 'Input: Main Configuration'
            }
          }
        },
        {
          id: `step-${id}-1-3`,
          stepNumber: 3,
          action: `Submit changes and verify execution status indicator`,
          targetElement: `button[type="submit"][data-action="deploy-now"]`,
          elementDescription: `Commit action button triggering state persistence`,
          selectorType: 'data-testid',
          importance: 'State persistence and confirmation',
          timestamp: '00:26',
          screenshotMockup: {
            pageTitle: `${brandName} / Confirmation View`,
            route: `https://${domain}/app/status`,
            wireframeType: 'dashboard',
            highlightBox: {
              top: 65,
              left: 60,
              width: 25,
              height: 9,
              label: 'Submit: Confirm & Run'
            }
          }
        }
      ]
    },
    {
      id: `wf-${id}-2`,
      title: `Team Permissions & Collaborative Workspace Setup`,
      description: `Discovered secondary path for onboarding team members and assigning role-based access.`,
      category: 'Admin & Settings',
      explanatoryScore: 0.88,
      estimatedDuration: '22s',
      isPrimary: false,
      stepsCount: 2,
      steps: [
        {
          id: `step-${id}-2-1`,
          stepNumber: 1,
          action: `Navigate to Settings → Organization Members`,
          targetElement: `a[href="/settings/members"]`,
          elementDescription: `Sidebar link for membership administration`,
          selectorType: 'CSS',
          importance: 'Settings navigation',
          timestamp: '00:05',
          screenshotMockup: {
            pageTitle: `${brandName} Settings / Team`,
            route: `https://${domain}/settings/members`,
            wireframeType: 'settings',
            highlightBox: {
              top: 25,
              left: 5,
              width: 20,
              height: 7,
              label: 'Nav: Members'
            }
          }
        },
        {
          id: `step-${id}-2-2`,
          stepNumber: 2,
          action: `Send invite link with 'Admin' role pre-selected`,
          targetElement: `button[data-action="send-invite"]`,
          elementDescription: `Invite dispatch button`,
          selectorType: 'data-testid',
          importance: 'Invitation dispatch',
          timestamp: '00:15',
          screenshotMockup: {
            pageTitle: `Invite Member Dialog`,
            route: `https://${domain}/settings/members#invite`,
            wireframeType: 'modal',
            highlightBox: {
              top: 50,
              left: 55,
              width: 30,
              height: 8,
              label: 'Button: Send Invite'
            }
          }
        }
      ]
    }
  ];

  return {
    id,
    name: brandName,
    url: payload.url.startsWith('http') ? payload.url : `https://${payload.url}`,
    domain,
    tagline: `Autonomously synthesized explainer experience for ${domain}, tailored for ${payload.targetAudience}.`,
    status: 'Completed',
    createdAt: new Date().toISOString(),
    videoDuration: payload.videoLength === '30s' ? '00:30' : payload.videoLength === '60s' ? '01:00' : '01:30',
    workflowsCount: generatedWorkflows.length,
    targetAudience: payload.targetAudience,
    focusAreas: payload.focusAreas,
    explanatoryScore: 0.94,
    summary: `ExplainerAI thoroughly inspected ${domain}, parsed DOM layouts, evaluated user task sequences, and compiled evidence-grounded video demonstrations.`,
    telemetry: {
      domNodesExplored: Math.floor(1100 + Math.random() * 800),
      routesCrawled: Math.floor(8 + Math.random() * 8),
      confidenceScore: 0.96,
      durationSeconds: payload.videoLength === '30s' ? 30 : payload.videoLength === '60s' ? 60 : 90,
      detectedTechStack: ['React', 'Next.js', 'Tailwind CSS', 'Vite']
    },
    workflows: generatedWorkflows,
    script: {
      tone: payload.tone,
      language: 'English (US)',
      wordCount: 135,
      estimatedDuration: payload.videoLength === '30s' ? '00:30' : '01:00',
      approved: true,
      sentences: [
        {
          id: `sent-${id}-1`,
          timestamp: '00:00 - 00:14',
          fullText: `Welcome to ${brandName}. This walkthrough highlights how ${payload.targetAudience.toLowerCase()} can accomplish their core tasks in record time.`,
          tokens: [
            { text: `Welcome to ${brandName}. This walkthrough highlights how `, isGrounded: false },
            {
              text: `${payload.targetAudience.toLowerCase()}`,
              isGrounded: true,
              groundingDetails: {
                targetElement: `button[data-action="primary-start"]`,
                targetLabel: `${brandName} primary action portal`,
                pageUrl: `https://${domain}/app/start`,
                confidence: 0.98,
                domSelector: `button[data-action="primary-start"]`
              }
            },
            { text: ` can accomplish their core tasks in record time.`, isGrounded: false }
          ]
        },
        {
          id: `sent-${id}-2`,
          timestamp: '00:14 - 00:35',
          fullText: `First, launch the central configuration drawer to personalize your workspace parameters with immediate visual validation.`,
          tokens: [
            { text: `First, launch the `, isGrounded: false },
            {
              text: `central configuration drawer`,
              isGrounded: true,
              groundingDetails: {
                targetElement: `input[name="workflow-param"]`,
                targetLabel: `Configuration parameter input`,
                pageUrl: `https://${domain}/app/setup`,
                confidence: 0.96,
                domSelector: `input[name="workflow-param"]`
              }
            },
            { text: ` to personalize your workspace parameters with immediate visual validation.`, isGrounded: false }
          ]
        },
        {
          id: `sent-${id}-3`,
          timestamp: '00:35 - 00:58',
          fullText: `Finally, submit your changes to deploy your state across the system and invite teammates with role-based governance.`,
          tokens: [
            { text: `Finally, submit your changes to `, isGrounded: false },
            {
              text: `deploy your state across the system`,
              isGrounded: true,
              groundingDetails: {
                targetElement: `button[type="submit"][data-action="deploy-now"]`,
                targetLabel: `Confirmation submit action`,
                pageUrl: `https://${domain}/app/status`,
                confidence: 0.99,
                domSelector: `button[data-action="deploy-now"]`
              }
            },
            { text: ` and invite teammates with role-based governance.`, isGrounded: false }
          ]
        }
      ]
    },
    video: {
      title: `${brandName}: Autonomous Explainer Video`,
      aspectRatio: '16:9',
      resolution: '1080p 60fps',
      durationSeconds: payload.videoLength === '30s' ? 30 : 60,
      voiceoverModel: 'ElevenLabs Studio / Adam (Natural SaaS Voice)',
      scenes: [
        {
          id: `sc-${id}-1`,
          startTime: 0,
          endTime: 14,
          title: `Introduction to ${brandName}`,
          narration: `Welcome to ${brandName}. This walkthrough highlights how ${payload.targetAudience.toLowerCase()} accomplish their core objectives.`,
          sceneType: 'intro'
        },
        {
          id: `sc-${id}-2`,
          startTime: 14,
          endTime: 35,
          title: `Central Workflow Configuration`,
          narration: `Launch the central configuration drawer to personalize workspace parameters.`,
          workflowStepId: `step-${id}-1-2`,
          sceneType: 'step',
          highlightLabel: `input[name="workflow-param"]`
        },
        {
          id: `sc-${id}-3`,
          startTime: 35,
          endTime: payload.videoLength === '30s' ? 30 : 60,
          title: `Persistence & Team Handoff`,
          narration: `Submit your changes and verify live execution.`,
          workflowStepId: `step-${id}-1-3`,
          sceneType: 'outro',
          highlightLabel: `button[data-action="deploy-now"]`
        }
      ]
    }
  };
}

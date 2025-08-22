import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Shield, 
  Users, 
  DollarSign, 
  Clock,
  Download,
  Copy,
  Eye,
  Edit,
  Save,
  AlertTriangle,
  CheckCircle,
  Info,
  HelpCircle,
  Globe,
  Calendar,
  MapPin,
  Building,
  User,
  Lock,
  Scale,
  Gavel,
  FileCheck,
  DownloadCloud,
  Printer,
  Share2,
  Settings,
  Zap,
  Star,
  TrendingUp
} from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";

interface LegalTemplate {
  id: string;
  name: string;
  description: string;
  category: 'nda' | 'ip' | 'founder' | 'contributor' | 'partnership' | 'terms';
  complexity: 'simple' | 'standard' | 'comprehensive';
  estimatedTime: string;
  jurisdictions: string[];
  icon: any;
  fields: TemplateField[];
  content: string;
}

interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'number' | 'checkbox' | 'email';
  required: boolean;
  placeholder?: string;
  options?: string[];
  defaultValue?: any;
  helpText?: string;
}

interface GeneratedDocument {
  id: string;
  templateId: string;
  title: string;
  content: string;
  createdAt: Date;
  status: 'draft' | 'reviewed' | 'signed' | 'archived';
  parties: string[];
  metadata: Record<string, any>;
}

const LegalDocumentGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<LegalTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [generatedDocument, setGeneratedDocument] = useState<GeneratedDocument | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('templates');

  const legalTemplates: LegalTemplate[] = [
    {
      id: 'nda-simple',
      name: 'Simple NDA',
      description: 'Basic non-disclosure agreement for early-stage discussions',
      category: 'nda',
      complexity: 'simple',
      estimatedTime: '5 minutes',
      jurisdictions: ['US', 'EU', 'UK'],
      icon: Lock,
      fields: [
        {
          id: 'disclosing_party',
          label: 'Disclosing Party (Company/Individual)',
          type: 'text',
          required: true,
          placeholder: 'e.g., Acme Corp or John Doe'
        },
        {
          id: 'receiving_party',
          label: 'Receiving Party (Company/Individual)',
          type: 'text',
          required: true,
          placeholder: 'e.g., Tech Startup or Jane Smith'
        },
        {
          id: 'effective_date',
          label: 'Effective Date',
          type: 'date',
          required: true
        },
        {
          id: 'confidential_info',
          label: 'Confidential Information Description',
          type: 'textarea',
          required: true,
          placeholder: 'Describe what information will be shared (e.g., business plans, technical specifications, customer data)'
        },
        {
          id: 'term_months',
          label: 'Term (Months)',
          type: 'number',
          required: true,
          defaultValue: 24,
          helpText: 'How long the NDA remains in effect'
        }
      ],
      content: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement (the "Agreement") is entered into as of {effective_date} by and between:

{disclosing_party} ("Disclosing Party")
and
{receiving_party} ("Receiving Party")

1. CONFIDENTIAL INFORMATION
The Disclosing Party may disclose confidential information including but not limited to: {confidential_info}

2. NON-DISCLOSURE
The Receiving Party agrees to:
- Keep confidential information strictly confidential
- Use confidential information solely for the purpose of evaluating the business relationship
- Not disclose confidential information to any third party without prior written consent

3. TERM
This Agreement shall remain in effect for {term_months} months from the effective date.

4. RETURN OF MATERIALS
Upon termination, the Receiving Party shall return all confidential materials to the Disclosing Party.

5. GOVERNING LAW
This Agreement shall be governed by the laws of the jurisdiction where the Disclosing Party is located.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

Disclosing Party: _________________
Receiving Party: _________________`
    },
    {
      id: 'ip-agreement',
      name: 'IP Assignment Agreement',
      description: 'Intellectual property assignment for contributors and employees',
      category: 'ip',
      complexity: 'standard',
      estimatedTime: '10 minutes',
      jurisdictions: ['US', 'EU', 'UK', 'Canada'],
      icon: Shield,
      fields: [
        {
          id: 'company_name',
          label: 'Company Name',
          type: 'text',
          required: true,
          placeholder: 'e.g., Acme Technologies Inc.'
        },
        {
          id: 'contributor_name',
          label: 'Contributor/Employee Name',
          type: 'text',
          required: true,
          placeholder: 'e.g., John Doe'
        },
        {
          id: 'project_name',
          label: 'Project Name',
          type: 'text',
          required: true,
          placeholder: 'e.g., Mobile App Development'
        },
        {
          id: 'start_date',
          label: 'Start Date',
          type: 'date',
          required: true
        },
        {
          id: 'compensation_type',
          label: 'Compensation Type',
          type: 'select',
          required: true,
          options: ['Equity', 'Revenue Sharing', 'Paid', 'Combination'],
          defaultValue: 'Equity'
        },
        {
          id: 'equity_percentage',
          label: 'Equity Percentage (if applicable)',
          type: 'number',
          required: false,
          placeholder: 'e.g., 10'
        },
        {
          id: 'work_description',
          label: 'Work Description',
          type: 'textarea',
          required: true,
          placeholder: 'Describe the work to be performed and IP to be created'
        }
      ],
      content: `INTELLECTUAL PROPERTY ASSIGNMENT AGREEMENT

This Intellectual Property Assignment Agreement (the "Agreement") is entered into as of {start_date} by and between:

{company_name} ("Company")
and
{contributor_name} ("Contributor")

1. WORK PERFORMED
Contributor will perform the following work: {work_description}

2. INTELLECTUAL PROPERTY ASSIGNMENT
Contributor hereby assigns to Company all right, title, and interest in and to any and all intellectual property created in connection with the {project_name} project.

3. COMPENSATION
In consideration for the assignment of intellectual property rights, Company agrees to provide: {compensation_type}
{f_equity_percentage}

4. CONFIDENTIALITY
Contributor agrees to maintain confidentiality of all proprietary information.

5. REPRESENTATIONS
Contributor represents that they have the right to assign the intellectual property and that the work is original.

6. GOVERNING LAW
This Agreement shall be governed by the laws of the jurisdiction where Company is located.

IN WITNESS WHEREOF, the parties have executed this Agreement.

Company: _________________
Contributor: _________________`
    },
    {
      id: 'founder-agreement',
      name: 'Founder Agreement',
      description: 'Comprehensive agreement between co-founders',
      category: 'founder',
      complexity: 'comprehensive',
      estimatedTime: '15 minutes',
      jurisdictions: ['US', 'EU', 'UK', 'Canada', 'Australia'],
      icon: Users,
      fields: [
        {
          id: 'company_name',
          label: 'Company Name',
          type: 'text',
          required: true,
          placeholder: 'e.g., Acme Technologies Inc.'
        },
        {
          id: 'founder1_name',
          label: 'Founder 1 Name',
          type: 'text',
          required: true,
          placeholder: 'e.g., John Doe'
        },
        {
          id: 'founder1_equity',
          label: 'Founder 1 Equity %',
          type: 'number',
          required: true,
          placeholder: 'e.g., 50'
        },
        {
          id: 'founder2_name',
          label: 'Founder 2 Name',
          type: 'text',
          required: true,
          placeholder: 'e.g., Jane Smith'
        },
        {
          id: 'founder2_equity',
          label: 'Founder 2 Equity %',
          type: 'number',
          required: true,
          placeholder: 'e.g., 50'
        },
        {
          id: 'vesting_schedule',
          label: 'Vesting Schedule',
          type: 'select',
          required: true,
          options: ['4 years with 1-year cliff', '3 years with 6-month cliff', '2 years with 6-month cliff', 'No vesting'],
          defaultValue: '4 years with 1-year cliff'
        },
        {
          id: 'roles_responsibilities',
          label: 'Roles and Responsibilities',
          type: 'textarea',
          required: true,
          placeholder: 'Describe each founder\'s role and responsibilities'
        },
        {
          id: 'decision_making',
          label: 'Decision Making Process',
          type: 'select',
          required: true,
          options: ['Unanimous consent', 'Majority vote', 'CEO has final say', 'Board approval required'],
          defaultValue: 'Unanimous consent'
        }
      ],
      content: `FOUNDER AGREEMENT

This Founder Agreement (the "Agreement") is entered into as of {date} by and between the founders of {company_name}:

{founder1_name} ("Founder 1")
{founder2_name} ("Founder 2")

1. EQUITY DISTRIBUTION
- Founder 1: {founder1_equity}% of the company's equity
- Founder 2: {founder2_equity}% of the company's equity

2. VESTING SCHEDULE
All founder equity shall vest according to the following schedule: {vesting_schedule}

3. ROLES AND RESPONSIBILITIES
{roles_responsibilities}

4. DECISION MAKING
{decision_making} shall be required for major company decisions.

5. CONFIDENTIALITY
All founders agree to maintain confidentiality of company information.

6. NON-COMPETE
Founders agree not to compete with the company during their involvement.

7. DISPUTE RESOLUTION
Disputes shall be resolved through mediation and arbitration.

8. AMENDMENTS
This Agreement may only be amended with unanimous consent of all founders.

IN WITNESS WHEREOF, the founders have executed this Agreement.

Founder 1: _________________
Founder 2: _________________`
    },
    {
      id: 'contributor-agreement',
      name: 'Contributor Agreement',
      description: 'Agreement for project contributors and contractors',
      category: 'contributor',
      complexity: 'standard',
      estimatedTime: '12 minutes',
      jurisdictions: ['US', 'EU', 'UK', 'Canada'],
      icon: User,
      fields: [
        {
          id: 'company_name',
          label: 'Company Name',
          type: 'text',
          required: true,
          placeholder: 'e.g., Acme Technologies Inc.'
        },
        {
          id: 'contributor_name',
          label: 'Contributor Name',
          type: 'text',
          required: true,
          placeholder: 'e.g., John Doe'
        },
        {
          id: 'project_scope',
          label: 'Project Scope',
          type: 'textarea',
          required: true,
          placeholder: 'Describe the specific work to be performed'
        },
        {
          id: 'compensation_amount',
          label: 'Compensation Amount',
          type: 'number',
          required: true,
          placeholder: 'e.g., 5000'
        },
        {
          id: 'compensation_type',
          label: 'Compensation Type',
          type: 'select',
          required: true,
          options: ['Fixed Price', 'Hourly Rate', 'Equity', 'Revenue Sharing', 'Combination'],
          defaultValue: 'Fixed Price'
        },
        {
          id: 'timeline',
          label: 'Project Timeline',
          type: 'text',
          required: true,
          placeholder: 'e.g., 3 months or 40 hours'
        },
        {
          id: 'deliverables',
          label: 'Deliverables',
          type: 'textarea',
          required: true,
          placeholder: 'List specific deliverables and milestones'
        }
      ],
      content: `CONTRIBUTOR AGREEMENT

This Contributor Agreement (the "Agreement") is entered into as of {date} by and between:

{company_name} ("Company")
and
{contributor_name} ("Contributor")

1. PROJECT SCOPE
Contributor shall perform the following work: {project_scope}

2. COMPENSATION
Company shall pay Contributor: {compensation_amount} ({compensation_type})

3. TIMELINE
The project shall be completed within: {timeline}

4. DELIVERABLES
Contributor shall deliver: {deliverables}

5. INTELLECTUAL PROPERTY
All work product shall be owned by Company.

6. CONFIDENTIALITY
Contributor agrees to maintain confidentiality of company information.

7. INDEPENDENT CONTRACTOR
Contributor is an independent contractor, not an employee.

8. TERMINATION
Either party may terminate this Agreement with 30 days written notice.

IN WITNESS WHEREOF, the parties have executed this Agreement.

Company: _________________
Contributor: _________________`
    },
    {
      id: 'partnership-agreement',
      name: 'Partnership Agreement',
      description: 'Agreement for business partnerships and joint ventures',
      category: 'partnership',
      complexity: 'comprehensive',
      estimatedTime: '20 minutes',
      jurisdictions: ['US', 'EU', 'UK', 'Canada', 'Australia'],
      icon: Building,
      fields: [
        {
          id: 'partnership_name',
          label: 'Partnership Name',
          type: 'text',
          required: true,
          placeholder: 'e.g., Tech Innovation Partnership'
        },
        {
          id: 'partner1_name',
          label: 'Partner 1 Name',
          type: 'text',
          required: true,
          placeholder: 'e.g., Acme Corp'
        },
        {
          id: 'partner1_contribution',
          label: 'Partner 1 Contribution',
          type: 'textarea',
          required: true,
          placeholder: 'Describe what Partner 1 brings to the partnership'
        },
        {
          id: 'partner2_name',
          label: 'Partner 2 Name',
          type: 'text',
          required: true,
          placeholder: 'e.g., Tech Startup LLC'
        },
        {
          id: 'partner2_contribution',
          label: 'Partner 2 Contribution',
          type: 'textarea',
          required: true,
          placeholder: 'Describe what Partner 2 brings to the partnership'
        },
        {
          id: 'profit_sharing',
          label: 'Profit Sharing',
          type: 'text',
          required: true,
          placeholder: 'e.g., 50/50 or 60/40'
        },
        {
          id: 'partnership_duration',
          label: 'Partnership Duration',
          type: 'select',
          required: true,
          options: ['1 year', '2 years', '3 years', '5 years', 'Indefinite'],
          defaultValue: '2 years'
        }
      ],
      content: `PARTNERSHIP AGREEMENT

This Partnership Agreement (the "Agreement") is entered into as of {date} by and between:

{partner1_name} ("Partner 1")
and
{partner2_name} ("Partner 2")

1. PARTNERSHIP PURPOSE
The parties agree to form a partnership for: {partnership_name}

2. CONTRIBUTIONS
Partner 1 shall contribute: {partner1_contribution}
Partner 2 shall contribute: {partner2_contribution}

3. PROFIT SHARING
Profits and losses shall be shared as follows: {profit_sharing}

4. DURATION
This partnership shall continue for: {partnership_duration}

5. MANAGEMENT
Both partners shall have equal management rights unless otherwise agreed.

6. DECISION MAKING
Major decisions require unanimous consent of both partners.

7. CONFIDENTIALITY
Both partners agree to maintain confidentiality of partnership information.

8. DISPUTE RESOLUTION
Disputes shall be resolved through mediation and arbitration.

IN WITNESS WHEREOF, the partners have executed this Agreement.

Partner 1: _________________
Partner 2: _________________`
    },
    {
      id: 'term-sheet',
      name: 'Term Sheet',
      description: 'Summary of key terms for investment or collaboration agreements',
      category: 'terms',
      complexity: 'standard',
      estimatedTime: '15 minutes',
      jurisdictions: ['US', 'EU', 'UK', 'Canada'],
      icon: FileText,
      fields: [
        {
          id: 'company_name',
          label: 'Company Name',
          type: 'text',
          required: true,
          placeholder: 'e.g., Acme Technologies Inc.'
        },
        {
          id: 'agreement_type',
          label: 'Agreement Type',
          type: 'select',
          required: true,
          options: ['Investment', 'Collaboration', 'Partnership', 'Licensing', 'Acquisition'],
          defaultValue: 'Collaboration'
        },
        {
          id: 'parties_involved',
          label: 'Parties Involved',
          type: 'textarea',
          required: true,
          placeholder: 'List all parties involved in the agreement'
        },
        {
          id: 'deal_value',
          label: 'Deal Value',
          type: 'text',
          required: true,
          placeholder: 'e.g., $100,000 or 20% equity'
        },
        {
          id: 'key_terms',
          label: 'Key Terms Summary',
          type: 'textarea',
          required: true,
          placeholder: 'Summarize the main terms of the agreement'
        },
        {
          id: 'timeline',
          label: 'Timeline',
          type: 'text',
          required: true,
          placeholder: 'e.g., 30 days to close'
        },
        {
          id: 'conditions',
          label: 'Conditions Precedent',
          type: 'textarea',
          required: false,
          placeholder: 'List any conditions that must be met before closing'
        },
        {
          id: 'governing_law',
          label: 'Governing Law',
          type: 'select',
          required: true,
          options: ['Delaware', 'California', 'New York', 'UK', 'EU', 'Other'],
          defaultValue: 'Delaware'
        }
      ],
      content: `TERM SHEET

{company_name}
{agreement_type} AGREEMENT

Date: {date}

PARTIES:
{parties_involved}

DEAL SUMMARY:
Deal Value: {deal_value}
Timeline: {timeline}

KEY TERMS:
{key_terms}

{f_conditions}

GOVERNING LAW:
This agreement shall be governed by the laws of {governing_law}.

CONFIDENTIALITY:
This term sheet is confidential and subject to a non-disclosure agreement.

NON-BINDING:
This term sheet is for discussion purposes only and does not constitute a binding agreement.

NEXT STEPS:
1. Review and negotiate terms
2. Conduct due diligence
3. Prepare definitive agreements
4. Close transaction

Authorized Signatures:

Company: _________________
Date: _________________

Counterparty: _________________
Date: _________________`
    }
  ];

  const handleTemplateSelect = (template: LegalTemplate) => {
    setSelectedTemplate(template);
    setFormData({});
    setGeneratedDocument(null);
    setActiveTab('customize');
  };

  const handleFormChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const generateDocument = async () => {
    if (!selectedTemplate) return;

    setIsGenerating(true);

    // Simulate document generation
    setTimeout(() => {
      let content = selectedTemplate.content;
      
      // Replace placeholders with form data
      Object.keys(formData).forEach(key => {
        const value = formData[key];
        if (value !== undefined && value !== null) {
          content = content.replace(new RegExp(`{${key}}`, 'g'), value.toString());
        }
      });

      // Handle conditional content
      if (formData.compensation_type === 'Equity' && formData.equity_percentage) {
        content = content.replace('{f_equity_percentage}', `Equity Percentage: ${formData.equity_percentage}%`);
      } else {
        content = content.replace('{f_equity_percentage}', '');
      }

      const document: GeneratedDocument = {
        id: Date.now().toString(),
        templateId: selectedTemplate.id,
        title: `${selectedTemplate.name} - ${formData.company_name || formData.disclosing_party || 'Document'}`,
        content,
        createdAt: new Date(),
        status: 'draft',
        parties: Object.values(formData).filter(v => typeof v === 'string' && v.includes('Name')).map(v => v.toString()),
        metadata: {
          template: selectedTemplate.name,
          formData,
          generatedAt: new Date().toISOString()
        }
      };

      setGeneratedDocument(document);
      setIsGenerating(false);
      setActiveTab('review');
    }, 2000);
  };

  const downloadDocument = () => {
    if (!generatedDocument) return;

    const blob = new Blob([generatedDocument.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedDocument.title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    if (!generatedDocument) return;
    navigator.clipboard.writeText(generatedDocument.content);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800';
      case 'standard': return 'bg-blue-100 text-blue-800';
      case 'comprehensive': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'nda': return Lock;
      case 'ip': return Shield;
      case 'founder': return Users;
      case 'contributor': return User;
      case 'partnership': return Building;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">
          <Scale className="w-8 h-8 inline mr-2 text-accent" />
          Legal Document Generator
        </h2>
        <p className="text-muted-foreground">
          Generate professional legal documents with customizable templates
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">Choose Template</TabsTrigger>
          <TabsTrigger value="customize" disabled={!selectedTemplate}>Customize</TabsTrigger>
          <TabsTrigger value="review" disabled={!generatedDocument}>Review & Download</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legalTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <ScrollReveal key={template.id}>
                  <Card 
                    className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                        <Badge className={getComplexityColor(template.complexity)}>
                          {template.complexity}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{template.estimatedTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Globe className="w-4 h-4" />
                        <span>{template.jurisdictions.join(', ')}</span>
                      </div>
                      <Button className="w-full" variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="customize" className="space-y-6">
          {selectedTemplate && (
            <>
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="w-5 h-5 text-accent" />
                    Customize {selectedTemplate.name}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Fill in the details below to generate your legal document
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedTemplate.fields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        <Label htmlFor={field.id} className="flex items-center gap-2">
                          {field.label}
                          {field.required && <span className="text-red-500">*</span>}
                          {field.helpText && (
                            <HelpCircle className="w-4 h-4 text-muted-foreground" title={field.helpText} />
                          )}
                        </Label>
                        
                        {field.type === 'text' && (
                          <Input
                            id={field.id}
                            placeholder={field.placeholder}
                            value={formData[field.id] || ''}
                            onChange={(e) => handleFormChange(field.id, e.target.value)}
                            required={field.required}
                          />
                        )}
                        
                        {field.type === 'textarea' && (
                          <Textarea
                            id={field.id}
                            placeholder={field.placeholder}
                            value={formData[field.id] || ''}
                            onChange={(e) => handleFormChange(field.id, e.target.value)}
                            required={field.required}
                            rows={3}
                          />
                        )}
                        
                        {field.type === 'select' && (
                          <Select
                            value={formData[field.id] || field.defaultValue || ''}
                            onValueChange={(value) => handleFormChange(field.id, value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        
                        {field.type === 'date' && (
                          <Input
                            id={field.id}
                            type="date"
                            value={formData[field.id] || ''}
                            onChange={(e) => handleFormChange(field.id, e.target.value)}
                            required={field.required}
                          />
                        )}
                        
                        {field.type === 'number' && (
                          <Input
                            id={field.id}
                            type="number"
                            placeholder={field.placeholder}
                            value={formData[field.id] || field.defaultValue || ''}
                            onChange={(e) => handleFormChange(field.id, e.target.value)}
                            required={field.required}
                          />
                        )}
                        
                        {field.type === 'checkbox' && (
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={field.id}
                              checked={formData[field.id] || false}
                              onCheckedChange={(checked) => handleFormChange(field.id, checked)}
                            />
                            <Label htmlFor={field.id}>{field.label}</Label>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 mt-8">
                    <Button
                      onClick={generateDocument}
                      disabled={isGenerating}
                      className="glow-green"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4 mr-2" />
                          Generate Document
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={() => setActiveTab('templates')}>
                      Back to Templates
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="review" className="space-y-6">
          {generatedDocument && (
            <>
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-accent" />
                    Review Your Document
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Generated Successfully
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {generatedDocument.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 p-4 rounded-lg border">
                    <pre className="whitespace-pre-wrap text-sm font-mono">
                      {generatedDocument.content}
                    </pre>
                  </div>
                  
                  <div className="flex gap-4 mt-6">
                    <Button onClick={downloadDocument} className="glow-green">
                      <Download className="w-4 h-4 mr-2" />
                      Download Document
                    </Button>
                    <Button onClick={copyToClipboard} variant="outline">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy to Clipboard
                    </Button>
                    <Button variant="outline">
                      <Printer className="w-4 h-4 mr-2" />
                      Print
                    </Button>
                  </div>
                  
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-800">Legal Disclaimer</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          This document is a template and should be reviewed by a qualified attorney before use. 
                          Colabship.io is not a law firm and does not provide legal advice. 
                          Laws vary by jurisdiction and may change over time.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LegalDocumentGenerator; 
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProjectService } from '../../../../core/services/project.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  projects: any[] = [];
  employees: any[] = [];
  availableEmployees: any[] = [];
  selectedProject: any;
  currentUser: any;
  chartOptions: any;
  isLoading = false;
  errorMessage = '';

  constructor(
    private projectService: ProjectService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadProjects();
    this.loadAvailableEmployees();
  }

  loadProjects() {
    this.isLoading = true;
    this.projectService.getProjects().subscribe({
      next: (response) => {
        this.projects = response.projects || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.errorMessage = 'Failed to load projects';
        this.isLoading = false;
      }
    });
  }

  loadAvailableEmployees() {
    this.projectService.getAvailableEmployees().subscribe({
      next: (response) => {
        this.availableEmployees = response.availableEmployees || [];
      },
      error: (error) => {
        console.error('Error loading available employees:', error);
      }
    });
  }

  selectProject(project: any) {
    this.selectedProject = project;
    this.isLoading = true;

    // Use demo endpoint for testing, or protected endpoint if user is authenticated
    const matchingService = this.currentUser
      ? this.projectService.getMatchingEmployees(project._id)
      : this.projectService.getDemoMatchingEmployees(project._id);

    matchingService.subscribe({
      next: (response) => {
        this.employees = response.data || [];

        // Debug: Log employee structure
        console.log('Employees loaded:', this.employees);
        if (this.employees.length > 0) {
          console.log('Sample employee:', this.employees[0]);
        }

        // Get AI suggestions for each employee
        if (this.employees.length > 0) {
          this.employees.forEach(emp => {
            this.getSuggestion(emp);
          });
        }

        this.generateSkillChart();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading matching employees:', error);
        this.errorMessage = 'Failed to load matching employees';
        this.isLoading = false;
      }
    });
  }

  generateSkillChart() {
    if (!this.employees || this.employees.length === 0) return;

    const skillMap: any = {};

    this.employees.forEach(emp => {
      (emp.matchedSkills || emp.skills || []).forEach((skill: string) => {
        skillMap[skill] = (skillMap[skill] || 0) + 1;
      });
    });

    this.chartOptions = {
      series: Object.values(skillMap),
      chart: {
        type: 'pie',
        height: 350
      },
      labels: Object.keys(skillMap),
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'],
      legend: {
        position: 'bottom'
      }
    };
  }

  logout() {
    this.authService.logout();
  }

  getTotalDailyLoss(): number {
    if (!this.employees) return 0;
    return this.employees
      .filter(emp => emp.dailyLoss !== undefined)
      .reduce((total, emp) => total + (emp.dailyLoss || 0), 0);
  }

  canSeeDailyLoss(): boolean {
    return this.currentUser?.role === 'PM' || !this.currentUser; // Show in demo mode
  }

  getSuggestion(emp: any) {
    if (this.selectedProject) {
      // Handle both _id and id properties, with fallback for debugging
      const employeeId = emp._id || emp.id;
      const projectId = this.selectedProject._id || this.selectedProject.id;

      if (!employeeId) {
        console.error('Employee ID not found:', emp);
        emp.suggestion = 'ID Error';
        return;
      }

      if (!projectId) {
        console.error('Project ID not found:', this.selectedProject);
        emp.suggestion = 'Project ID Error';
        return;
      }

      this.projectService
        .getSkillSuggestion(employeeId, projectId)
        .subscribe({
          next: (res) => {
            emp.suggestion = res.suggestion;
          },
          error: (error) => {
            console.error('Error getting skill suggestion:', error);
            emp.suggestion = 'Error loading suggestion';
          }
        });
    }
  }
}

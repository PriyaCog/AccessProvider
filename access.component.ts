import { Component, OnInit } from '@angular/core';
import { AccessLevelDetails } from './model/AccessLevelDetails';
import { AccessLevelService } from './service/access-level.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {

  private accessLevel: string[];
  private associateId: string;
  private selectedAccessLevel: string;
  private accessLevelDetails: AccessLevelDetails;

  constructor(private accessLevelService: AccessLevelService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.accessLevelService.getAccessTypes().subscribe(model => {
      this.accessLevel = model.map(c => c.AccessType);
    });
  }

  public giveAccess() {
    this.accessLevelService.getAccessDetails(this.associateId).subscribe(model => {
      this.accessLevelDetails = model;
      const access = { AssociateID: this.associateId, AccessLevel: this.selectedAccessLevel, ID: (this.accessLevelDetails && this.accessLevelDetails.ID) ? this.accessLevelDetails.ID : null };
      this.accessLevelService.updateAccess(access);
      this.toasterService.pop("success", "Access provided Successfully");
    }), error => {
      this.toasterService.pop("error", "Error Occurred while providing access");
      console.log(error);
    };
  }

}

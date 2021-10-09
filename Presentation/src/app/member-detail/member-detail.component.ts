import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member | undefined;
  show = false;
  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService
  ) { }

  ngOnInit(): void {
    this.getMember();
  }

  getMember(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.memberService.getMember(id)
      .subscribe(member => this.member = member);
  }
}

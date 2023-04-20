import { Component, OnInit } from '@angular/core';
import * as aq from 'arquero';
import { Struct } from 'arquero/dist/types/op/op-api';

@Component({
  selector: 'arquero-issue-repro-arq',
  templateUrl: './arq.component.html',
  styleUrls: ['./arq.component.css'],
})
export class ArqComponent implements OnInit {
  ngOnInit(): void {
    const df = aq.table({
      category: ['a', 'a', 'a', 'b', 'b', 'b', 'c', 'c', 'c', 'x', 'y'],
      dataCol: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
    });

    // this fails
    try {
      df.params({ dim: 'category' })
        .filter((s: Struct, $: Struct) => aq.op.equal(s[$.dim], 'a'))
        .objects();
      console.log('no escape filter succeeds');
    } catch (e) {
      console.error(e);
      console.log('no escape filter fails');
    }

    try {
      df.params({ dim: 'category' })
        .filter(
          aq.escape((s: Struct, $: Struct) => aq.op.equal(s[$.dim], 'a'))
        )
        .objects();
      console.log('with escape filter succeeds');
    } catch (e) {
      console.error(e);
      console.log('with escape filter fails');
    }

    try {
      df.params({ dim: 'dataCol' })
        .rollup({max: (s: Struct, $: Struct) => aq.op.max(s[$.dim])})
        .objects();

      console.log('no escape rollup succeeds');
    } catch (e) {
      console.error(e);
      console.log('no escape rollup fails');
    }

    try {
      const dim = 'dataCol';
      df
        .rollup({max: aq.escape( (s: Struct) => aq.op.max(s[dim]))})
        .objects();

      console.log('escaped rollup succeeds');
    } catch (e) {
      console.error(e);
      console.log('escaped rollup fails');
    }


    return;
  }
}

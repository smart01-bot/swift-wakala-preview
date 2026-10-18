/* Swift Wakala portfolio demonstration — synthetic, browser-only state. */
(function (scope) {
  'use strict';
  const NETWORKS = ['M-Pesa', 'Mixx by Yas', 'Airtel Money', 'HaloPesa'];
  const IDENTIFIER_TYPES = ['Wallet', 'Agent', 'Till'];
  const STATUS = {
    awaiting_review: 'Awaiting review', awaiting_source: 'Capacity reserved',
    source_confirmed: 'Source confirmed', payout_pending: 'Payout pending',
    needs_attention: 'Needs reconciliation', completed: 'Completed', rejected: 'Rejected'
  };
  function fail(message) { throw new Error(message); }
  function makeSeed() {
    const now = Date.now();
    return {
      role: 'agent', screen: 'home', theme: 'dark', lang: 'en',
      selectedRequest: null, selectedApplication: null, dialog: null,
      onboardStep: 0, onboard: { name: '', phone: '', business: '', location: '', network: 'M-Pesa', document: false },
      agencyCapacity: 2800000, sequence: 2042, appSequence: 4,
      requests: [
        { id: 'SW-2041', agentId: 'agent-1', agentName: 'Amina Salehe', amount: 185000, source: { network: 'M-Pesa', type: 'Agent', identifier: '0712000041' }, destination: { network: 'Mixx by Yas', type: 'Agent', identifier: '0655000042' }, urgent: true, fee: 0, status: 'awaiting_review', reserved: false, createdAt: new Date(now - 18*60000).toISOString(), events: ['Request submitted for review'] },
        { id: 'SW-2037', agentId: 'agent-1', agentName: 'Amina Salehe', amount: 320000, source: { network: 'Airtel Money', type: 'Till', identifier: '1234500' }, destination: { network: 'M-Pesa', type: 'Agent', identifier: '0712000041' }, urgent: false, fee: 0, status: 'completed', reserved: false, createdAt: new Date(now - 86400000).toISOString(), events: ['Request submitted', 'Capacity reserved', 'Source confirmed (simulation)', 'Payout confirmed (simulation)'] },
        { id: 'SW-2035', agentId: 'agent-2', agentName: 'Baraka Mushi', amount: 90000, source: { network: 'HaloPesa', type: 'Wallet', identifier: '0622000081' }, destination: { network: 'Airtel Money', type: 'Till', identifier: '882211' }, urgent: false, fee: 0, status: 'needs_attention', reserved: true, createdAt: new Date(now - 172800000).toISOString(), events: ['Request submitted', 'Capacity reserved', 'Payout outcome unknown: held for reconciliation'] }
      ],
      agents: [
        { id: 'agent-1', name: 'Amina Salehe', business: 'Upendo Wakala', network: 'M-Pesa', location: 'Kigamboni' },
        { id: 'agent-2', name: 'Baraka Mushi', business: 'Umoja Payments', network: 'HaloPesa', location: 'Temeke' }
      ],
      applications: [{ id: 'AP-0003', name: 'Neema Nyoni', phone: '07XX XXX 093', business: 'Mawimbi Agency', location: 'Ilala', network: 'Mixx by Yas', status: 'submitted', note: '' }],
      accounts: [
        { network: 'M-Pesa', type: 'Agent', identifier: '0712000041' },
        { network: 'Mixx by Yas', type: 'Agent', identifier: '0655000042' },
        { network: 'Airtel Money', type: 'Till', identifier: '1234500' },
        { network: 'HaloPesa', type: 'Wallet', identifier: '0622000081' }
      ]
    };
  }
  function findRequest(s,id) { const r=s.requests.find(r=>r.id===id); if(!r) fail('Request not found.'); return r; }
  function findApplication(s,id) { const r=s.applications.find(r=>r.id===id); if(!r) fail('Application not found.'); return r; }
  function availableCapacity(s) { return s.agencyCapacity - s.requests.filter(r=>r.reserved).reduce((sum,r)=>sum+r.amount,0); }
  function normalizeEndpoint(raw) {
    const network=String(raw?.network||'').trim(), type=String(raw?.type||'').trim(), identifier=String(raw?.identifier||'').replace(/\s/g,'');
    if (!NETWORKS.includes(network)) fail('Choose a valid network for both accounts.');
    if (!IDENTIFIER_TYPES.includes(type)) fail('Choose Wallet, Agent or Till for each account.');
    if (!/^\d{5,15}$/.test(identifier)) fail('Enter a numeric account identifier (5–15 digits).');
    return { network, type, identifier };
  }
  function validateDraft(draft) {
    const source=normalizeEndpoint(draft.source), destination=normalizeEndpoint(draft.destination);
    if (source.network===destination.network) fail('Choose different source and destination networks.');
    if (!/^\d+$/.test(String(draft.amount||''))) fail('Enter a whole-TZS amount.');
    const amount=Number(draft.amount);
    if (!Number.isSafeInteger(amount) || amount <= 0 || amount > 50000000) fail('Demo supports whole-TZS amounts from 1 to 50,000,000.');
    return { source, destination, amount, urgent: Boolean(draft.urgent) };
  }
  function submitRequest(s,draft) {
    const item=validateDraft(draft);
    const id='SW-'+(++s.sequence);
    const record={ id, agentId:'agent-1', agentName:'Amina Salehe',...item, fee:0, status:'awaiting_review', reserved:false, createdAt:new Date().toISOString(), events:['Agent submitted request for main-agent review'] };
    s.requests.unshift(record);
    return record;
  }
  function requireStatus(r,expected) { if(r.status!==expected) fail('This action is not available at the current request stage.'); }
  function accept(s,id) {
    const r=findRequest(s,id); requireStatus(r,'awaiting_review');
    if (availableCapacity(s)<r.amount) fail('Insufficient simulated destination capacity. Acceptance is blocked.');
    r.reserved=true; r.status='awaiting_source'; r.events.push('Main agent accepted; capacity reserved (simulation)'); return r;
  }
  function reject(s,id,reason) { const r=findRequest(s,id); requireStatus(r,'awaiting_review'); if(!String(reason||'').trim()) fail('Enter a reason for rejection.');r.status='rejected';r.reason=String(reason).trim();r.events.push('Rejected: '+r.reason);return r; }
  function collect(s,id) {const r=findRequest(s,id);requireStatus(r,'awaiting_source');r.status='source_confirmed';r.events.push('Synthetic source collection confirmed');return r;}
  function payout(s,id) {const r=findRequest(s,id);requireStatus(r,'source_confirmed');r.status='payout_pending';r.events.push('Synthetic payout started');return r;}
  function unknown(s,id) {const r=findRequest(s,id);requireStatus(r,'payout_pending');r.status='needs_attention';r.events.push('Synthetic outcome unknown; reservation retained');return r;}
  function reconcile(s,id) {const r=findRequest(s,id);requireStatus(r,'needs_attention');r.status='payout_pending';r.events.push('Synthetic reconciliation recorded; review can continue');return r;}
  function complete(s,id) {const r=findRequest(s,id);requireStatus(r,'payout_pending');r.status='completed';r.reserved=false;r.events.push('Synthetic payout confirmed; reservation released');return r;}
  function apply(s,data) {
    const name=String(data.name||'').trim(),phone=String(data.phone||'').trim(),business=String(data.business||'').trim();
    if(name.length<3 || phone.replace(/\D/g,'').length<9 || business.length<3)fail('Complete a name, phone number and business name first.');
    if(!data.document)fail('Mark the synthetic document step complete.');
    const record={ id:'AP-'+String(++s.appSequence).padStart(4,'0'), name,phone,business,location:String(data.location||'Dar es Salaam'),network:data.network,status:'submitted',note:''};s.applications.unshift(record);return record;
  }
  function decideApplication(s,id,decision,reason='') {
    const a=findApplication(s,id);if(a.status!=='submitted')fail('Only submitted applications can be reviewed.');
    if(decision==='approve') {a.status='approved';s.agents.push({id:'agent-'+(s.agents.length+1),name:a.name,business:a.business,network:a.network,location:a.location});}
    else if(decision==='correct' || decision==='reject') {if(!String(reason).trim())fail('Give a reason for this decision.');a.status=decision==='correct'?'corrections_requested':'rejected';a.note=String(reason).trim();}
    else fail('Invalid application decision.');
    return a;
  }
  const api={NETWORKS,IDENTIFIER_TYPES,STATUS,makeSeed,availableCapacity,findRequest,findApplication,validateDraft,submitRequest,accept,reject,collect,payout,unknown,reconcile,complete,apply,decideApplication};
  if(typeof module!=='undefined' && module.exports)module.exports=api;
  scope.SwiftDemoModel=api;
})(typeof window!=='undefined'?window:globalThis);

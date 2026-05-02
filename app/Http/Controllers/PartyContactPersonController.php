<?php

namespace App\Http\Controllers;

use App\Enums\RecordStatus;
use App\Http\Requests\SavePartyContactPersonRequest;
use App\Models\Party;
use App\Models\PartyContactPerson;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PartyContactPersonController extends Controller
{
    public function create(Party $party): Response
    {
        return Inertia::render('party-contact-persons/create', [
            'party' => $party,
            'statusOptions' => RecordStatus::options(),
        ]);
    }

    public function store(SavePartyContactPersonRequest $request, Party $party): RedirectResponse
    {
        $contactPerson = $party->contactPersons()->create($request->validated());

        if ($contactPerson->is_primary) {
            $party->contactPersons()
                ->where('id', '!=', $contactPerson->id)
                ->update(['is_primary' => false]);
        }

        return to_route('parties.party-contact-persons.edit', ['party' => $party, 'party_contact_person' => $contactPerson])
            ->with('status', 'Contact person created successfully.');
    }

    public function edit(Party $party, PartyContactPerson $partyContactPerson): Response
    {
        return Inertia::render('party-contact-persons/edit', [
            'party' => $party,
            'partyContactPerson' => $partyContactPerson,
            'statusOptions' => RecordStatus::options(),
        ]);
    }

    public function update(SavePartyContactPersonRequest $request, Party $party, PartyContactPerson $partyContactPerson): RedirectResponse
    {
        $partyContactPerson->update($request->validated());

        if ($partyContactPerson->is_primary) {
            $party->contactPersons()
                ->where('id', '!=', $partyContactPerson->id)
                ->update(['is_primary' => false]);
        }

        return to_route('parties.party-contact-persons.edit', ['party' => $party, 'party_contact_person' => $partyContactPerson])
            ->with('status', 'Contact person updated successfully.');
    }

    public function destroy(Party $party, PartyContactPerson $partyContactPerson): RedirectResponse
    {
        $partyContactPerson->delete();

        return to_route('parties.show', $party)
            ->with('status', 'Contact person deleted successfully.');
    }
}
